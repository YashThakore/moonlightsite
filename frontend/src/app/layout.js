import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Moonlight",
  description: "Moonlight discord bot for your server",
  icons: {
    icon: "/moonlightpic.jpg",
    shortcut: "/moonlightpic.jpg",
    apple: "/moonlightpic.jpg",
  },
  openGraph: {
    title: "Moonlight",
    description: "Moonlight discord bot for your server",
    url: "https://moonlightsite.vercel.app/",
    siteName: "Moonlight",
    images: [
      {
        url: "/moonlightpic.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
