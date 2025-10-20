import DecorativeWave from "@/components/Sections/Shared/DecorativeWave";

export default function CookiesLayout({ children }) {
  return (
    <>
      <DecorativeWave />
      {children}
      <DecorativeWave rotated={true} />
    </>
  );
}
