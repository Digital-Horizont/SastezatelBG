import { notFound } from "next/navigation";
import ClientPage from "./page.client";
import { booksData } from "@/data/books";

export function generateStaticParams() {
  return booksData.map((b) => ({ key: b.key }));
}

export function generateMetadata({ params }) {
  const product = booksData.find((b) => b.key === params.key);
  if (!product) return {};
  return {
    title: product.meta_title,
    description: product.meta_description,
    keywords: product.meta_keywords,
  };
}

export default function BookDetailServerPage({ params, searchParams }) {
  const product = booksData.find((b) => b.key === params.key);
  if (!product) return notFound();

  return <ClientPage product={product} />;
}
