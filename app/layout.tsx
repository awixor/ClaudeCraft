import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://claude-craft-kappa.vercel.app/"),
  title: {
    default: "ClaudeCraft — Claude Best Practices Gallery",
    template: "%s | ClaudeCraft",
  },
  description:
    "A curated, interactive gallery of best practices for prompting and collaborating with Claude for software engineering.",
  keywords: [
    "Claude",
    "Anthropic",
    "prompt engineering",
    "AI",
    "best practices",
    "developer tools",
  ],
  authors: [{ name: "ClaudeCraft Contributor" }],
  creator: "ClaudeCraft",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://claude-craft-kappa.vercel.app/",
    title: "ClaudeCraft — Claude Best Practices Gallery",
    description:
      "A curated, interactive gallery of best practices for prompting and collaborating with Claude for software engineering.",
    siteName: "ClaudeCraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClaudeCraft — Claude Best Practices Gallery",
    description:
      "A curated, interactive gallery of best practices for prompting and collaborating with Claude for software engineering.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border py-8 mt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
                <p>
                  Built for developers who want to get the most out of Claude.{" "}
                  <span className="font-mono text-xs opacity-70">
                    // ClaudeCraft
                  </span>
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
