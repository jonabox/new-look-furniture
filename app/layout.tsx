import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Look Furniture — Artesano Bonafide Certificado",
  description:
    "Desde el año 2002, nos dedicamos a la preservación y restauración de piezas de alto valor histórico y sentimental en Puerto Rico. Artesano Bonafide Certificado con más de 20 años de experiencia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
