"use client";

import { useShopStore } from "@/stores/Shop/useShopStore";
import styles from "./ProductInfo.module.css";
import { EUR_TO_BGN } from "@/constants/common";

export default function ProductInfo({ title, description, price }) {
  const { quantity, setQuantity, incrementQuantity, decrementQuantity } = useShopStore();

  const priceInLeva = price * EUR_TO_BGN;

  const qtyNumber = Number.parseInt(quantity, 10);
  const safeQty = Number.isFinite(qtyNumber) && qtyNumber >= 1 ? qtyNumber : 0;

  const totalPriceInLeva = priceInLeva * safeQty;
  const totalPriceInEur = price * safeQty;

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
      return;
    }
    const numValue = Number.parseInt(value, 10);
    if (!Number.isNaN(numValue) && numValue >= 1) {
      setQuantity(numValue);
    }
  };

  const handleInputBlur = () => {
    const n = Number.parseInt(quantity, 10);
    if (!Number.isFinite(n) || n < 1) setQuantity(1);
  };

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.desc}>{description}</p>

      <div className={styles.bottomSection}>
        <div className={styles.priceContainer}>
          <p className={styles.priceBgn}>{totalPriceInLeva.toFixed(2)} лв</p>
          <p className={styles.priceEur}>(€{totalPriceInEur.toFixed(2)})</p>
        </div>

        <div className={styles.quantityControls}>
          <button
            className={styles.quantityButton}
            onClick={decrementQuantity}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            className={styles.quantityInput}
            value={quantity}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min="1"
            max="20"
            aria-label="Quantity"
          />
          <button
            className={styles.quantityButton}
            onClick={incrementQuantity}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
