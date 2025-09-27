import HeroSection from "@/components/Sections/Home/Hero";
import DecorativeWave from "@/components/Sections/Home/DecorativeWave";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <DecorativeWave rotated={true}/>
    </main>
  );
}
