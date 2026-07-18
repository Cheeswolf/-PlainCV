import type { PublicSupportConfig, SupportChannelId } from "@/types/supportTypes";

const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];

const channelSettings = {
  wechat: {
    label: "微信支付",
    qrEnvironmentKey: "PLAINCV_SUPPORT_WECHAT_QR_BASE64",
    recipientEnvironmentKey: "PLAINCV_SUPPORT_WECHAT_RECIPIENT",
  },
  alipay: {
    label: "支付宝",
    qrEnvironmentKey: "PLAINCV_SUPPORT_ALIPAY_QR_BASE64",
    recipientEnvironmentKey: "PLAINCV_SUPPORT_ALIPAY_RECIPIENT",
  },
} as const satisfies Record<SupportChannelId, {
  label: string;
  qrEnvironmentKey: string;
  recipientEnvironmentKey: string;
}>;

const channelIds = Object.keys(channelSettings) as SupportChannelId[];
type SupportEnvironment = Readonly<Record<string, string | undefined>>;

function decodePngBase64(value: string | undefined): Uint8Array | null {
  if (!value) return null;

  const normalized = value
    .replace(/^data:image\/png;base64,/i, "")
    .replace(/\s/g, "");

  if (
    normalized.length === 0 ||
    normalized.length % 4 !== 0 ||
    !/^[A-Za-z0-9+/]*={0,2}$/.test(normalized)
  ) return null;

  const bytes = Uint8Array.from(Buffer.from(normalized, "base64"));
  const isPng = PNG_SIGNATURE.every((byte, index) => bytes[index] === byte);
  return isPng ? bytes : null;
}

function hasAllQrCodes(environment: SupportEnvironment): boolean {
  return channelIds.every((channelId) => {
    const key = channelSettings[channelId].qrEnvironmentKey;
    return decodePngBase64(environment[key]) !== null;
  });
}

export function isSupportEnabled(environment: SupportEnvironment = process.env): boolean {
  return environment.PLAINCV_SUPPORT_ENABLED === "true" && hasAllQrCodes(environment);
}

export function getPublicSupportConfig(
  environment: SupportEnvironment = process.env,
): PublicSupportConfig {
  if (!isSupportEnabled(environment)) return { enabled: false, channels: [] };

  return {
    enabled: true,
    channels: channelIds.map((id) => {
      const settings = channelSettings[id];
      return {
        id,
        label: settings.label,
        recipientHint: environment[settings.recipientEnvironmentKey]?.trim() || "请核对收款人",
        qrUrl: `/api/support/qr/${id}`,
      };
    }),
  };
}

export function getSupportQrCode(
  channelId: SupportChannelId,
  environment: SupportEnvironment = process.env,
): Uint8Array | null {
  if (!isSupportEnabled(environment)) return null;
  return decodePngBase64(environment[channelSettings[channelId].qrEnvironmentKey]);
}
