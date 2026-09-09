import { Fraunces, Source_Sans_3 } from "next/font/google";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { withBasePath } from "@/lib/base-path";
import "./globals.css";

const heading = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NoteFluent — learn to read sheet music",
    template: "%s · NoteFluent",
  },
  description:
    "A sequenced course from a blank staff to reading a simple treble melody with rhythm. For beginners through early intermediate players.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <style>{`
          @font-face {
            font-family: "Bravura";
            src: url("${withBasePath("/fonts/bravura.woff2")}") format("woff2");
            font-display: block;
          }
          @font-face {
            font-family: "Academico";
            src: url("${withBasePath("/fonts/academico.woff2")}") format("woff2");
            font-display: swap;
          }
        `}</style>
        <link
          rel="preload"
          href={withBasePath("/fonts/bravura.woff2")}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={withBasePath("/fonts/academico.woff2")}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <div className="font-preload" aria-hidden>
          <span style={{ fontFamily: "Bravura" }}>{"\uE050"}</span>
          <span style={{ fontFamily: "Academico" }}>4</span>
        </div>
        <SiteHeader />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
