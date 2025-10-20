import DecorativeWave from "@/components/Sections/Shared/DecorativeWave";
import HeroSection from "@/components/Sections/Home/Hero";
import Platform3to4Section from "@/components/Sections/Home/Platform3to4";
import Platform5to8Section from "@/components/Sections/Home/Platform5to8";
import BooksAndMerchSection from "@/components/Sections/Home/BooksAndMerch";

export const metadata = {
  title: "Състезател.БГ – Онлайн платформа и книги по състезателна математика",
  description:
    "Подготви се за състезания по математика с платформата Състезател.БГ – видеоуроци, задачи и книги за ученици от 3-8 клас. Учи, упражнявай се и побеждавай!",
  keywords:
    "състезателна математика, онлайн обучение по математика, подготовка по състезателна математика, задачи по математика, книги по състезателна математика, видеоуроци по математика, състезателна математика 3 клас, състезателна математика 4 клас, състезателна математика 5 клас, състезателна математика 6 клас, състезателна математика 7 клас, състезателна математика 8 клас, подготовка за олимпиади, сборник задачи по математика, математически състезания, Състезател.БГ",
  openGraph: {
    title: "Състезател.БГ – Онлайн платформа и книги по състезателна математика",
    description:
      "Видео уроци, задачи и книги за подготовка по състезателна математика за ученици от 3-8 клас. Учи и постигай успехи със Състезател.БГ!",
    url: "https://www.sastezatel.bg/",
    type: "website",
    images: [
      {
        url: "https://www.sastezatel.bg/kniga_reklama.png",
        width: 512,
        height: 512,
        alt: "Състезател.БГ – платформа и книги по състезателна математика",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Състезател.БГ – Онлайн платформа и книги по състезателна математика",
    description:
      "Видео уроци, задачи и книги за подготовка по състезателна математика за ученици от 3-8 клас. Учи и постигай успехи със Състезател.БГ!",
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
