import { notFound } from "next/navigation";
import ClientPage from "./page.client";
import { merchData } from "@/data/merch";

export function generateStaticParams() {
  return merchData.map((m) => ({ key: m.key }));
}

export async function generateMetadata({ params }) {
  const { key } = await params;
  const product = merchData.find((m) => m.key === key);
  if (!product) return {};
  return {
    title: product.meta_title,
    description: product.meta_description,
    keywords: product.meta_keywords,
  };
}

export default async function MerchDetailServerPage({ params }) {
  const { key } = await params;
  const product = merchData.find((m) => m.key === key);
  if (!product) return notFound();

  return <ClientPage product={product} />;
}
