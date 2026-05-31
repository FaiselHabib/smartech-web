import type { Metadata } from "next";
import { site } from "./site";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description = site.description,
  path = "/",
  image = site.ogImage,
  keywords,
  type = "website",
}: SeoInput = {}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.shortDescription}`;
  const url = `${site.url}${path}`;
  return {
    metadataBase: new URL(site.url),
    title: fullTitle,
    description,
    keywords: keywords ?? [...site.keywords],
    alternates: { canonical: url, languages: { "ar-SA": url } },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.nameEn,
  alternateName: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/brand/smartech-logo.png`,
  sameAs: [site.contact.instagram, site.contact.tiktok],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      contactType: "customer service",
      areaServed: "SA",
      availableLanguage: ["Arabic", "English"],
    },
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.nameEn,
  description: site.description,
  image: `${site.url}/brand/smartech-logo.png`,
  url: site.url,
  telephone: site.contact.phone,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jeddah",
    addressCountry: "SA",
  },
  priceRange: "$$",
};
