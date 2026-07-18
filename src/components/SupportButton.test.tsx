import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SupportButton } from "./SupportButton";

describe("SupportButton", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("stays hidden when the official deployment feature is disabled", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ enabled: false, channels: [] }),
    }));

    render(<SupportButton />);
    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
    expect(screen.queryByRole("button", { name: "支持作者" })).not.toBeInTheDocument();
  });

  it("shows both payment channels in an accessible dialog", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        enabled: true,
        channels: [
          { id: "wechat", label: "微信支付", recipientHint: "微信收款人", qrUrl: "/api/support/qr/wechat" },
          { id: "alipay", label: "支付宝", recipientHint: "支付宝收款人", qrUrl: "/api/support/qr/alipay" },
        ],
      }),
    }));

    render(<SupportButton />);
    const button = await screen.findByRole("button", { name: "支持作者" });
    fireEvent.click(button);

    expect(screen.getByRole("heading", { name: "支持白简历" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "微信支付" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "支付宝" })).toBeInTheDocument();
    expect(screen.getByText(/全部功能均可免费使用/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "微信支付支持作者二维码" })).toHaveAttribute(
      "src",
      "/api/support/qr/wechat",
    );
  });
});
