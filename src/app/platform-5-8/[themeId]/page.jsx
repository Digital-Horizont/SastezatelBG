import { themes_5_8 } from "@/data/platform-5-8";
import ThemePageClient from "./page.client";

export const dynamicParams = false;

export function generateStaticParams() {
  console.log(themes_5_8[0])
  return themes_5_8.map((t) => ({ themeId: t.key }));
}

export async function generateMetadata({ params }) {
  const { themeId } = await params;
  const theme = themes_5_8.find((t) => t.key === themeId);

  const baseUrl = "https://sastezatel.bg";

  return {
    title: theme.meta_title,
    description: theme.meta_description,
    keywords: theme.meta_keywords || [],
    openGraph: {
      title: theme.meta_title,
      description: theme.meta_description,
      url: `${baseUrl}/platform-5-8/${themeId}`,
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
      canonical: `${baseUrl}/platform-5-8/${themeId}` 
    },
  };
}

export default async function Page({ params }) {
  const { themeId } = await params;

  return (
    <ThemePageClient
      themes={themes_5_8}
      initialSelectedKey={themeId}
      platformLink="https://example.com/subscribe"
    />
  );
}
