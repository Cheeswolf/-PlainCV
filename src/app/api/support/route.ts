import { getPublicSupportConfig } from "@/config/supportConfig";

export const dynamic = "force-dynamic";

export function GET(): Response {
  return Response.json(getPublicSupportConfig(), {
    headers: { "Cache-Control": "no-store" },
  });
}
