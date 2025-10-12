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

  if (!theme) {
    return {
      title: "Платформа 3–4 кл",
      description: "Образователни теми за 3–4 клас.",
      keywords: [],
      alternates: { canonical: `${baseUrl}/platform-3-4` },
    };
  }

  return {
    title: theme.meta_title || theme.title,
    description: theme.meta_description || theme.description,
    keywords: theme.meta_keywords || [],
    alternates: { canonical: `${baseUrl}/platform-3-4/${themeId}` },
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
