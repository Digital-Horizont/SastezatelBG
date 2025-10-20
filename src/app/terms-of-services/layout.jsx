import DecorativeWave from "@/components/Sections/Shared/DecorativeWave";

export default function TermsOfServiceLayout({ children }) {
  return (
    <>
      <DecorativeWave />
      {children}
      <DecorativeWave rotated={true} />
    </>
  );
}
