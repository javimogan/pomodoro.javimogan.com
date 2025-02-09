import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./Component/Header";
import Footer from "./Component/Footer";


const Font = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pomodoro by javimogan",
  description: "Pomodoro timer"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`flex flex-col ${Font.className} content-between antialiased min-h-screen justify-items-center`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
