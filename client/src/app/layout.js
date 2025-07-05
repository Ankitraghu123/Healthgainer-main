// import RootLayoutClient from "./RootLayoutClient";

// export const metadata = {
//   title: "Health Gainer",
//   description: "A modern Next.js application with Tailwind CSS and Redux.",
// };

// export default function RootLayout({ children }) {
//   return <RootLayoutClient>{children}</RootLayoutClient>;
// }

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ProvidersWrapper from "./providers-wrapper"; // 👈 import new wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Health Gainer",
  description: "A modern Next.js application with Tailwind CSS and Redux.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
