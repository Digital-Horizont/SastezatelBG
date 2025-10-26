import { redirect } from 'next/navigation';
import { FIRST_PLATFORM_3_4 } from '@/constants/route_details';

const title = "Платформа 3-4 клас | Състезател.БГ – Всичко за състезатели";
const description = "Състезател.БГ е платформа по състезателна математика за ученици 3 клас и 4 клас с онлайн обяснения на задачи и подготовка за състезания.";
const keywords = ["Състезател.БГ" , "3 клас" , "4 клас" , "платформа" , "състезателна математика"]
const url = "https://sastezatel.bg/platform-3-4";

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

export default function PlatformPage3to4() {
  redirect(`/platform-3-4/${FIRST_PLATFORM_3_4}`);
}
