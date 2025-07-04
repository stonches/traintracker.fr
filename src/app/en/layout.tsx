import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Train Tracker France",
  description: "Track your trains across France in real-time",
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}