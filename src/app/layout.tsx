import type { Metadata } from "next";
import "./globals.css";
import AdvisorStickyCTA from "./_components/AdvisorStickyCTA";

export const metadata: Metadata = {
  title: "InsureGrow",
  description: "Life insurance insights and advisory",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {/* site-wide background */}
        <div aria-hidden className="fixed inset-0 -z-10">
          {/* image */}
          <div className="absolute inset-0 bg-[url('/bg/insuregrow-bg.jpeg')] bg-cover bg-center bg-no-repeat" />
          {/* overlay for contrast; tweak opacity as you like */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
        </div>

        {/* keep space for sticky CTA */}
        <div className="pb-24">{children}</div>
        <AdvisorStickyCTA />
      </body>
    </html>
  );
}
