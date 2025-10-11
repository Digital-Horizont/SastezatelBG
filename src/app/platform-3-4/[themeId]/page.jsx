import { themes_3_4 } from "@/data/platform-3-4";
import ThemePageClient from "./page.client";

export const dynamicParams = false;

export function generateStaticParams() {
  return themes_3_4.map((t) => ({ themeId: t.key }));
}

export function generateMetathemes({ params }) {
  const theme = themes_3_4.find((t) => t.key === params.themeId);
  if (!theme) {
    return {
      title: "Платформа 3–4 кл",
      description: "Образователни теми за 3–4 клас.",
      keywords: [],
    };
  }
  return {
    title: theme.meta_title || theme.title,
    description: theme.meta_description || theme.description,
    keywords: theme.meta_keywords || [],
  };
}

export default function Page({ params }) {
  return (
    <ThemePageClient
      themes={themes_3_4}
      initialSelectedKey={params.themeId}
      platformLink="https://example.com/subscribe"
    />
  );
}
