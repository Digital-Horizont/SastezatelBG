import { Suspense } from "react";
import Filter from "@/components/Sections/Shop/Filter";
import Products from "@/components/Sections/Shop/Products";
import styles from "./page.module.css";

const meta_title = "Книги по състезателна математика | Състезател.БГ книжарница"
const meta_description = "Разгледай нашия онлайн магазин с книги по състезателна математика за ученици. Подготви се с помагала и сборници от Състезател.БГ!";
const meta_keywords = ["състезателна математика", "книги по състезателна математика", "сборник задачи по математика", "помагала по математика", "тестове по математика", "подготовка за състезания", "математически книги", "онлайн магазин", "Състезател.БГ"];

export const metadata = {
  title: meta_title,
  description: meta_description,
  keywords: meta_keywords,
  openGraph: {
    title: meta_title,
    description: meta_description,
    url: "https://www.sastezatel.bg/shop",
    images: [
      {
        url: "https://www.sastezatel.bg/og-image-shop.jpg",
        width: 1200,
        height: 630,
        alt: "Онлайн книжарница с книги по състезателна математика – Състезател.БГ",
      },
    ],
    locale: "bg_BG",
    type: "website",
    siteName: "Състезател.БГ",
  },
  twitter: {
    card: "summary_large_image",
    title: meta_title,
    description: meta_description,
    images: ["https://www.sastezatel.bg/og-image-shop.jpg"],
  },
  alternates: {
    canonical: "https://www.sastezatel.bg/shop",
  },
};

function ShopContent() {
  return (
    <div className={styles.container}>
      <div className={styles.bubble3} />
      <div className={styles.content}>
        <Filter />
        <Products />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
