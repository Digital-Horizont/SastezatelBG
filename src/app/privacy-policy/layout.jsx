import DecorativeWave from "@/components/Sections/Shared/DecorativeWave";

export default function PrivacyPolicyLayout({ children }) {
  return (
    <>
      <DecorativeWave />
      {children}
      <DecorativeWave rotated={true} />
    </>
  );
}
