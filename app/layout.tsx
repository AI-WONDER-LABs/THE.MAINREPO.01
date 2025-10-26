import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import { AppProvider } from "@/contexts/AppContext";
import { BuilderProvider } from "@/contexts/BuilderContext";

export const metadata: Metadata = {
  title: "Frontend Builder - Create Beautiful Websites",
  description: "A powerful React/Next.js SaaS website and app builder with drag-and-drop UI, code export, and AI integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <UserProvider>
          <AppProvider>
            <BuilderProvider>
              {children}
            </BuilderProvider>
          </AppProvider>
        </UserProvider>
      </body>
    </html>
  );
}
