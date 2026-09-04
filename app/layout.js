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
  title: "Muhammed Shifin | MERN Stack Developer",
  description:
    "MERN Stack Developer based in Malappuram, Kerala — building scalable full-stack web applications with MongoDB, Express.js, React, and Node.js.",
  keywords: [
    "Muhammed Shifin",
    "MERN Stack Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Kerala",
  ],
  authors: [{ name: "Muhammed Shifin" }],
  openGraph: {
    title: "Muhammed Shifin | MERN Stack Developer",
    description:
      "MERN Stack Developer building scalable full-stack web applications with MongoDB, Express.js, React, and Node.js.",
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
