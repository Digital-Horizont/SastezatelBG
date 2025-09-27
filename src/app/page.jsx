import DecorativeWave from "@/components/Sections/Home/DecorativeWave";
import HeroSection from "@/components/Sections/Home/Hero";
import Platform3to5Section from "@/components/Sections/Home/Platform3to5";
import Platform5to7Section from "@/components/Sections/Home/Platform5to7";
import BooksAndMerchSection from "@/components/Sections/Home/BooksAndMerch";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <DecorativeWave rotated={true}/>
      <Platform3to5Section />
      <DecorativeWave />
      <Platform5to7Section />
      <DecorativeWave rotated={true}/>
      <BooksAndMerchSection />
    </main>
  );
}
