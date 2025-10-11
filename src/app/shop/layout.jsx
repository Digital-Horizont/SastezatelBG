import DecorativeWave from "@/components/Sections/Shared/DecorativeWave";
import PaymentPopup from "@/components/Sections/Shop/PaymentPopup";

export default function ShopLayout({ children }) {
  return (
    <>
      <DecorativeWave />
      {children}
      <PaymentPopup />
      <DecorativeWave rotated={true} />
    </>
  );
}
