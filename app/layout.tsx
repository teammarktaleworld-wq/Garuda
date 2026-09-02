import type { Metadata } from "next";
import Script from "next/script";
import PageLoaderWrapper from "./components/PageLoaderWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garud Tata | Authorized Tata Motors Dealer | Palam, New Delhi",
  description:
    "Garud Tata — Authorized Tata Motors dealership in Palam, New Delhi. Explore the full Tata Motors range: Harrier, Safari, Nexon, Punch, Curvv, Sierra, Tiago, Altroz. Book a test drive today.",
  keywords:
    "Garud Tata, Tata Motors showroom Delhi, Tata showroom Palam, Tata cars Delhi, Tata dealer Delhi, Tata Harrier Delhi, Tata Safari Delhi, Tata Nexon Delhi",
  openGraph: {
    title: "Garud Tata | Authorized Tata Motors Dealer",
    description:
      "Experience the full Tata Motors range at Garud Tata, Palam, New Delhi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* =========================================================
            GOOGLE TAG MANAGER
            Container ID: GTM-N887GC9J
        ========================================================= */}

        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event:'gtm.js'
              });
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';

              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N887GC9J');
          `}
        </Script>

        {/* =========================================================
            FONTS
        ========================================================= */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* =========================================================
            PRELOAD HERO IMAGE
        ========================================================= */}

        <link
          rel="preload"
          as="image"
          href="/images/vehicles/sierrakv-3.avif"
          type="image/avif"
        />

        {/* =========================================================
            THEME
        ========================================================= */}

        <meta name="theme-color" content="#050A12" />

        {/* =========================================================
            STRUCTURED DATA
        ========================================================= */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",

              name: "Garud Tata",

              description:
                "Authorized Tata Motors Dealer in Palam, New Delhi",

              address: {
                "@type": "PostalAddress",

                streetAddress:
                  "Sales-Garg Plaza, RZ A70, Dabri - Palam Rd, Main Shiv Market",

                addressLocality: "Palam",

                addressRegion: "New Delhi",

                postalCode: "110045",

                addressCountry: "IN",
              },

              brand: {
                "@type": "Brand",
                name: "Tata Motors",
              },
            }),
          }}
        />
      </head>

      <body className="bg-[#050A12] antialiased">
        {/* =========================================================
            GOOGLE TAG MANAGER NOSCRIPT
        ========================================================= */}

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N887GC9J"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        {/* =========================================================
            PAGE LOADER
        ========================================================= */}

        <PageLoaderWrapper />

        {/* =========================================================
            WEBSITE CONTENT
        ========================================================= */}

        {children}
      </body>
    </html>
  );
}