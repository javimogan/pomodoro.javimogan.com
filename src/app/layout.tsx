import { Noto_Serif_Ahom } from "next/font/google";
import "./globals.css";
import Header from "./Component/Header";
import Footer from "./Component/Footer";


const NotoSerif = Noto_Serif_Ahom({
  weight: "400",
  variable: "--font-noto-serif-ahom",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`flex flex-col ${NotoSerif.className} content-between antialiased min-h-screen justify-items-center`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
