import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/_layout/Header";
import { Footer } from "@/components/_layout/Footer";
import { AppointmentsProvider } from "@/context/AppointmentsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital Management System",
  description: "Hospital Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppointmentsProvider>
    <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      </AppointmentsProvider>
    </html>
  );
}