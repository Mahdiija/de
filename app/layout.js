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
    default: "Klarform — Deutsche Grammatik",
    template: "%s · Klarform",
  },
  description:
    "Grammatik von A2 bis C1: Lektionen, Übungen mit genauer Rückmeldung, drei Prüfungen und Spiele.",
};

export const viewport = {
  themeColor: "#efe6d6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${fraunces.variable} ${outfit.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
