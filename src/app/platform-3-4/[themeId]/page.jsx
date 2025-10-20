import { themes_3_4 } from "@/data/platform-3-4";
import ThemePageClient from "./page.client";

export const dynamicParams = false;

export function generateStaticParams() {
  return themes_3_4.map((t) => ({ themeId: t.key }));
}

export async function generateMetadata({ params }) {
  const { themeId } = await params;
  const theme = themes_3_4.find((t) => t.key === themeId);

  const baseUrl = "https://sastezatel.bg";

  return {
    title: theme.meta_title,
    description: theme.meta_description,
    keywords: theme.meta_keywords || [],
    openGraph: {
      title: theme.meta_title,
      description: theme.meta_description,
      url: `${baseUrl}/platform-3-4/${themeId}`,
      images: [{
        url: "https://www.sastezatel.bg/kniga_reklama.png",
        width: 512,
        height: 512,
        alt: "Състезател.БГ – платформа и книги по състезателна математика",
      }],
      locale: "bg_BG",
      type: "website",
      siteName: "Състезател.БГ",
    },
    twitter: {
      card: "summary_large_image",
      title: theme.meta_title,
      description: theme.meta_description,
      images: ["https://www.sastezatel.bg/kniga_reklama.png"],
    },
    alternates: { 
      canonical: `${baseUrl}/platform-3-4/${themeId}` 
    },
  };
}

export const viewport = {
  themeColor: "#ffffff",
};

export default async function Page({ params }) {
  const { themeId } = await params;
  return (
    <ThemePageClient
      themes={themes_3_4}
      initialSelectedKey={themeId}
      platformLink="https://example.com/subscribe"
    />
  );
}
