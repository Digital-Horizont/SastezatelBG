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

  if (!theme) {
    return {
      title: "Платформа 5–7 кл",
      description: "Образователни теми за 5–7 клас.",
      keywords: [],
    };
  }

  return {
    title: theme.meta_title || theme.title,
    description: theme.meta_description || theme.description,
    keywords: theme.meta_keywords || [],
  };
}

export const viewport = {
  themeColor: "#ffffff",
};

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
