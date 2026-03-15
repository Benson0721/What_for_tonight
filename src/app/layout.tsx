import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "What for Tonight",
  description: "用幾個輕量條件，快速找到今晚可以開始的 3 個選項。",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-Hant">
      <body className="text-[var(--color-ink)] antialiased">
        <div className="app-stage">
          <div className="app-frame">
            <div className="app-viewport">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
