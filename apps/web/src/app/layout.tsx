import type { Metadata } from "next";
import type { RootLayoutProps } from "@/types/layout.types";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaeser Bench",
  description: "Inspect how coding agents work within an unfamiliar design system.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
