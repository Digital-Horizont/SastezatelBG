import { redirect } from 'next/navigation';
import { FIRST_SHOP_BOOKS } from '@/constants/route_details';

const title = "Книжарница | Състезател.БГ – Всичко за състезатели";
const description = "СъстезателБГ книжарница за ученици – книги по математика, помагала и ресурси за състезателна математика и подготовка за състезания.";
const keywords = ["книжарница" , "СъстезателБГ" , "състезателна математика" , "книга по математика" , "подготовка за състезания" , "помагало"]
const url = "https://sastezatel.bg/shop/books";

export const metadata = {
  title: title,
  description: description,
  keywords: keywords,
  openGraph: {
    title: title,
    description: description,
    url: url,
    images: [
      {
        url: "https://www.sastezatel.bg/favicon-512x512.png",
        width: 512,
        height: 512,
        alt: "Снимка на логото на Състезател.БГ",
      },
    ],
    siteName: "Състезател.БГ",
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: ["https://www.sastezatel.bg/favicon-512x512.png"],
  },
  alternates: {
    canonical: url,
  },
};


export default function ShopBooks() {
  redirect(`/shop/books/${FIRST_SHOP_BOOKS}`);
}
