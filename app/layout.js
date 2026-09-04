import { Space_Grotesk, Inter, DM_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Muhammed Shifin | Full Stack Developer",
  description:
    "Full Stack Developer based in Malappuram, Kerala — building scalable full-stack web applications and CMS platforms with MongoDB, Express.js, React, Next.js, and Node.js.",
  keywords: [
    "Muhammed Shifin",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Kerala",
  ],
  authors: [{ name: "Muhammed Shifin" }],
  openGraph: {
    title: "Muhammed Shifin | Full Stack Developer",
    description:
      "Full Stack Developer building scalable full-stack web applications and CMS platforms with MongoDB, Express.js, React, Next.js, and Node.js.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${dmMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
