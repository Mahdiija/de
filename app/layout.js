import { Fraunces, Outfit } from "next/font/google";
import { Shell } from "@/src/components/Shell";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default: "Klarform — German grammar, in shape",
    template: "%s · Klarform",
  },
  description:
    "A grammar studio from A2 to C1: lessons, drills with instant feedback, three exams, and games.",
};

export const viewport = {
  themeColor: "#efe6d6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
