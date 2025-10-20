import { notFound } from "next/navigation";
import ClientPage from "./page.client";
import { booksData } from "@/data/books";

export function generateStaticParams() {
  return booksData.map((b) => ({ key: b.key }));
}

export function generateMetadata({ params }) {
  const product = booksData.find((b) => b.key === params.key);
  if (!product) return {};

  const baseUrl = "https://www.sastezatel.bg";
  const productUrl = `${baseUrl}/shop/${product.key}`;
  const productImage = `${baseUrl}${product.book_img}`;

  return {
    title: product.meta_title,
    description: product.meta_description,
    keywords: product.meta_keywords,
    openGraph: {
      title: product.meta_title,
      description: product.meta_description,
      url: productUrl,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: product.book_name,
        },
      ],
      siteName: "Състезател.БГ",
      locale: "bg_BG",
      type: "product",
    },
    twitter: {
      card: "summary_large_image",
      title: product.meta_title,
      description: product.meta_description,
      images: [productImage],
    },
    alternates: {
      canonical: productUrl,
    },
  };
}

export default function BookDetailServerPage({ params }) {
  const product = booksData.find((b) => b.key === params.key);
  if (!product) return notFound();

  return <ClientPage product={product} />;
}
