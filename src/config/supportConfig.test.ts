import { describe, expect, it } from "vitest";
import {
  getPublicSupportConfig,
  getSupportQrCode,
  isSupportEnabled,
} from "./supportConfig";

const TEST_PNG_BASE64 = Buffer.from(
  Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10, 0]),
).toString("base64");

function enabledEnvironment(): Record<string, string | undefined> {
  return {
    PLAINCV_SUPPORT_ENABLED: "true",
    PLAINCV_SUPPORT_WECHAT_QR_BASE64: TEST_PNG_BASE64,
    PLAINCV_SUPPORT_WECHAT_RECIPIENT: "微信收款人：白简历",
    PLAINCV_SUPPORT_ALIPAY_QR_BASE64: TEST_PNG_BASE64,
    PLAINCV_SUPPORT_ALIPAY_RECIPIENT: "支付宝收款人：白简历",
  };
}

describe("supportConfig", () => {
  it("is disabled by default", () => {
    expect(isSupportEnabled({})).toBe(false);
    expect(getPublicSupportConfig({})).toEqual({ enabled: false, channels: [] });
  });

  it("requires both valid PNG QR codes", () => {
    const environment = enabledEnvironment();
    delete environment.PLAINCV_SUPPORT_ALIPAY_QR_BASE64;
    expect(isSupportEnabled(environment)).toBe(false);
  });

  it("returns only public channel metadata", () => {
    const environment = enabledEnvironment();
    const config = getPublicSupportConfig(environment);

    expect(config.enabled).toBe(true);
    expect(config.channels).toHaveLength(2);
    expect(config.channels[0].qrUrl).toBe("/api/support/qr/wechat");
    expect(JSON.stringify(config)).not.toContain(TEST_PNG_BASE64);
  });

  it("returns decoded image bytes only when fully enabled", () => {
    const environment = enabledEnvironment();
    expect(getSupportQrCode("wechat", environment)?.slice(0, 8)).toEqual(
      Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]),
    );
    environment.PLAINCV_SUPPORT_ENABLED = "false";
    expect(getSupportQrCode("wechat", environment)).toBeNull();
  });
});
