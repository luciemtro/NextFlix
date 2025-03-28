import { LanguageProvider } from "@/context/LanguageContext";
import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import NavLogin from "@/components/NavLogin";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
});
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-title",
});

export const metadata: Metadata = {
  title: "NextFlix",
  description:
    "NextFlix est une reproduction de Netflix développée avec Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${anton.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          <NavLogin />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
