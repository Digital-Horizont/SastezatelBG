import { Suspense } from "react";
import Filter from "@/components/Sections/Shop/Filter";
import Products from "@/components/Sections/Shop/Products";
import DecorativeWave from "@/components/Sections/Shared/DecorativeWave";
import styles from "./page.module.css";

function ShopContent() {
  return (
    <div className={styles.container}>
      <div className={styles.bubble3} />

      <div className={styles.content}>
        <Filter />
        <Products />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
