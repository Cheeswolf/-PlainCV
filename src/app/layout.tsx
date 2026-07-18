import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "白简历 PlainCV",
  description: "固定模板的在线简历编辑与 PDF 导出工具",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
