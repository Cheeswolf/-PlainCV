import { z } from "zod";

export const supportChannelIdSchema = z.enum(["wechat", "alipay"]);

export const publicSupportChannelSchema = z.object({
  id: supportChannelIdSchema,
  label: z.string(),
  recipientHint: z.string(),
  qrUrl: z.string(),
});

export const publicSupportConfigSchema = z.object({
  enabled: z.boolean(),
  channels: z.array(publicSupportChannelSchema),
});

export type SupportChannelId = z.infer<typeof supportChannelIdSchema>;
export type PublicSupportConfig = z.infer<typeof publicSupportConfigSchema>;
