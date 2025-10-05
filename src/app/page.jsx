import DecorativeWave from "@/components/Sections/Shared/DecorativeWave";
import HeroSection from "@/components/Sections/Home/Hero";
import Platform3to4Section from "@/components/Sections/Home/Platform3to4";
import Platform5to7Section from "@/components/Sections/Home/Platform5to7";
import BooksAndMerchSection from "@/components/Sections/Home/BooksAndMerch";

export default function HomePage() {
  return (
    <main>
      <DecorativeWave />
      <HeroSection />
      <DecorativeWave rotated={true}/>
      <Platform3to4Section />
      <DecorativeWave />
      <Platform5to7Section />
      <DecorativeWave rotated={true}/>
      <BooksAndMerchSection />
    </main>
  );
}
