import DecorativeWave from "@/components/Sections/Shared/DecorativeWave";
import HeroSection from "@/components/Sections/Home/Hero";
import Platform3to4Section from "@/components/Sections/Home/Platform3to4";
import Platform5to8Section from "@/components/Sections/Home/Platform5to8";
import BooksAndMerchSection from "@/components/Sections/Home/BooksAndMerch";

const meta_title = "Състезател.БГ – платформа и книги по състезателна математика";
const meta_description = "Подготви се за състезания по математика с платформата Състезател.БГ – видеоуроци, задачи и книги за ученици от 3-8 клас. Учи, упражнявай се и побеждавай!";
const meta_keywords = ["състезателна математика", "онлайн обучение по математика", "подготовка по състезателна математика", "задачи по математика", "книги по състезателна математика", "видеоуроци по математика", "състезателна математика 3 клас", "състезателна математика 4 клас", "състезателна математика 5 клас", "състезателна математика 6 клас", "състезателна математика 7 клас", "състезателна математика 8 клас", "подготовка за олимпиади", "сборник задачи по математика", "математически състезания", "Състезател.БГ"];

export const metadata = {
  title: meta_title,
  description: meta_description,
  keywords: meta_keywords,
  openGraph: {
    title: meta_title,
    description: meta_description,
    url: "https://www.sastezatel.bg/",
    images: [
      {
        url: "https://www.sastezatel.bg/kniga_reklama.png",
        width: 1200,
        height: 902,
        alt: meta_title,
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
    images: ["https://www.sastezatel.bg/kniga_reklama.png"],
  },
  alternates: {
    canonical: "https://www.sastezatel.bg/",
  }
};

export default function HomePage() {
  return (
    <main>
      <DecorativeWave />
      <HeroSection />
      <DecorativeWave rotated={true}/>
      <Platform3to4Section />
      <DecorativeWave />
      <Platform5to8Section />
      <DecorativeWave rotated={true}/>
      <BooksAndMerchSection />
    </main>
  );
}
