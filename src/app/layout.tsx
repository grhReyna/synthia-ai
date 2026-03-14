import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBunker from "@/components/FloatingBunker";
import { LanguageProvider } from "@/lib/LanguageContext";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Synthia AI - Epic AI Prompts",
  description: "AI Influencer specializing in epic and realistic prompts for anime, gaming and geek culture universes.",
  metadataBase: new URL("https://synthia.ai"),
  openGraph: {
    title: "Synthia AI - Epic AI Prompts",
    description: "AI Influencer specializing in epic and realistic prompts for anime, gaming and geek culture universes.",
    type: "website",
    images: ["/assets/banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synthia AI - Epic AI Prompts",
    description: "AI Influencer specializing in epic and realistic prompts for anime, gaming and geek culture universes.",
    images: ["/assets/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var o=new MutationObserver(function(m){m.forEach(function(r){if(r.attributeName==='bis_skin_checked'){r.target.removeAttribute('bis_skin_checked')}})});o.observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:['bis_skin_checked']})})();`,
          }}
        />
      </head>
      <body className={`${poppins.className} bg-synthia-light-bg text-gray-800`} suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingBunker />
        </LanguageProvider>
      </body>
    </html>
  );
}
