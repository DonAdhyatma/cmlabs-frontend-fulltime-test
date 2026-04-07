import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/organisms/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mealapp | Danni Adhyatma Rachman",
  description: "See All The Delicious Foods",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <Navbar/>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
