import RootLayoutClient from "./RootLayoutClient";

export const metadata = {
  title: "Health Gainer",
  description: "A modern Next.js application with Tailwind CSS and Redux.",
};

export default function RootLayout({ children }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
