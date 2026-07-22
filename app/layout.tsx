import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "💖 Sana Özel | Love",
  description: "Bu sayfa sadece senin için hazırlandı. Seni seviyorum ❤️",
  keywords: "aşk, sevgi, sürpriz, romantik",
  openGraph: {
    title: "💖 Sana Özel",
    description: "Bu sayfa sadece senin için hazırlandı ❤️",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full"
        style={{
          background: "#0a0c10",
          color: "#ffffff",
          fontFamily: "'Inter', sans-serif",
          margin: 0,
          padding: 0,
          overflowX: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
