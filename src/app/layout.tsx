import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SEOWebAgency | SEO & Digital Growth Solutions",
  description: "Accelerate your business with SEOWebAgency. We build high-conversion websites, generate qualified leads, optimize Google Business Profiles, and scale organic search traffic with advanced AI-powered strategies.",
  keywords: ["SEO Services", "Website Development", "Local SEO", "Google Business Profile Optimization", "AI Automation", "Lead Generation", "Digital Marketing"],
  authors: [{ name: "SEOWebAgency" }],
  verification: {
    google: "google-site-verification-id-placeholder",
  },
  alternates: {
    canonical: "https://seowebagency.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "SEOWebAgency",
    "url": "https://seowebagency.in",
    "logo": "https://seowebagency.in/logo.png",
    "image": "https://seowebagency.in/hero-screenshot.png",
    "telephone": "+918803511070",
    "email": "seowebagency.in@gmail.com",
    "sameAs": [
      "https://wa.me/918860384919"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Begum Bridge Road, Civil Lines",
      "addressLocality": "Meerut",
      "addressRegion": "UP",
      "postalCode": "250001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.9845",
      "longitude": "77.7064"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved || 'system';
                  var root = document.documentElement;
                  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    root.classList.add('dark');
                  } else {
                    root.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
        {/* Schema JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        
        {/* GA4 Script Async */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GA4ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GA4ID', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-[#ffffff] dark:bg-[#030303] text-zinc-950 dark:text-zinc-50 selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}


