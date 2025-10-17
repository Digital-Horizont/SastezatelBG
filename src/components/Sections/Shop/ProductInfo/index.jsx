"use client"

import { useState } from "react"
import styles from "./ProductInfo.module.css"

export default function ProductInfo({ title, description, price }) {
  const [quantity, setQuantity] = useState(1)

  const priceInLeva = price * 1.9557
  const totalPriceInLeva = priceInLeva * quantity
  const totalPriceInEur = price * quantity

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const handleInputChange = (e) => {
    const value = e.target.value
    if (value === "") {
      setQuantity("")
      return
    }
    const numValue = Number.parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 1) {
      setQuantity(numValue)
    }
  }

  const handleInputBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1)
    }
  }

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
          <button className={styles.quantityButton} onClick={decrementQuantity} aria-label="Decrease quantity">
            −
          </button>
          <input
            type="number"
            className={styles.quantityInput}
            value={quantity}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min="1"
            aria-label="Quantity"
          />
          <button className={styles.quantityButton} onClick={incrementQuantity} aria-label="Increase quantity">
            +
          </button>
        </div>
      </div>
    </div>
  )
}
