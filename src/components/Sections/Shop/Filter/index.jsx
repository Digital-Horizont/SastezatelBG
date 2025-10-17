"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { BookOpen, ShoppingBag } from "lucide-react"
import styles from "./Filter.module.css"

export default function Filter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentType = searchParams.get("type") || "books"

  const handleTypeChange = (type) => {
    router.push(`/shop?type=${type}`)
  }

  return (
    <div className={styles.filterCard}>
      <div className={styles.filterPad}>
        <h1 className={styles.title}>
          <span className={styles.titleIconWrap}>
            <ShoppingBag className={styles.titleIcon} />
          </span>
          <span>Магазин</span>
        </h1>

        <div className={styles.filterButtons}>
          <button
            onClick={() => handleTypeChange("books")}
            className={`${styles.filterBtn} ${
              currentType === "books" ? styles.filterBtnActive : ""
            }`}
          >
            <BookOpen className={styles.filterIcon} />
            <span>Книги</span>
          </button>

          {/* <button
            onClick={() => handleTypeChange("merch")}
            className={`${styles.filterBtn} ${
              currentType === "merch" ? styles.filterBtnActive : ""
            }`}
          >
            <ShoppingBag className={styles.filterIcon} />
            <span>Мърч</span>
          </button> */}
        </div>
      </div>
    </div>
  )
}
