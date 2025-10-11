"use client";

import styles from "./ProductInfo.module.css";

export default function ProductInfo({ title, description, price }) {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.desc}>{description}</p>
      <p className={styles.price}>€{price.toFixed(2)}</p>
    </div>
  );
}
