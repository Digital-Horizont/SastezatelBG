"use client"

import styles from "./ProductInfo.module.css"

export default function ProductInfo({ title, description, price }) {
  const priceInLeva = price * 1.9557;

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.desc}>{description}</p>
      <div className={styles.priceContainer}>
        <p className={styles.priceBgn}>{priceInLeva.toFixed(2)} лв</p>
        <p className={styles.priceEur}>(€{price.toFixed(2)})</p>
      </div>
    </div>
  )
}
