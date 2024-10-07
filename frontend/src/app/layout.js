import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/app/components/navbar';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Targi Pracy PJATK",
  description: "Strona Targów Pracy w Polsko-Japońskiej Akademii Technik Komputerowych",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
