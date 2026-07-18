import { getSupportQrCode } from "@/config/supportConfig";
import { supportChannelIdSchema } from "@/types/supportTypes";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ channel: string }>;
}

export async function GET(_request: Request, context: RouteContext): Promise<Response> {
  const { channel } = await context.params;
  const parsedChannel = supportChannelIdSchema.safeParse(channel);
  if (!parsedChannel.success) return new Response(null, { status: 404 });

  const image = getSupportQrCode(parsedChannel.data);
  if (!image) return new Response(null, { status: 404 });

  const body = new ArrayBuffer(image.byteLength);
  new Uint8Array(body).set(image);

  return new Response(body, {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Type": "image/png",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
