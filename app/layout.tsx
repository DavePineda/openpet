import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenPet · Guardería",
  description: "Guardería de mascotas · Sala Soles",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body
        className={`${fredoka.variable} ${nunito.variable} min-h-full flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
