import data from "@/data/platform-5-7.json";
import ThemePageClient from "./page.client";

export const dynamicParams = false;

export function generateStaticParams() {
  return data.map((t) => ({ themeId: t.key }));
}

export function generateMetadata({ params }) {
  const theme = data.find((t) => t.key === params.themeId);
  if (!theme) {
    return {
      title: "Платформа 3–5 кл",
      description: "Образователни теми за 3–5 клас.",
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
      themes={data}
      initialSelectedKey={params.themeId}
      platformLink="https://example.com/subscribe"
    />
  );
}
