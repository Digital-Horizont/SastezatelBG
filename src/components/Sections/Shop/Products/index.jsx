"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Package } from "lucide-react"
import { booksData } from "@/data/books"
import { merchData } from "@/data/merch"
import styles from "./Products.module.css"
import { EUR_TO_BGN } from "@/constants/common"

import Image from "next/image"

export default function Products() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentType = searchParams.get("type") || "books"

  const products = currentType === "books" ? booksData : merchData
  const activeProducts = products.filter((p) => (currentType === "books" ? p.book_active : p.merch_active))

  const handleProductClick = (product) => {
    const key = currentType === "books" ? product.key : product.key
    const segment = currentType === "books" ? "books" : "merch"
    router.push(`/shop/${segment}/${key}`)
  }

  return (
    <div className={styles.productsCard}>
      <div className={styles.productsPad}>
        <h2 className={styles.sectionTitle}>{currentType === "books" ? "Налични книги" : "Наличен мърч"}</h2>

        {activeProducts.length === 0 ? (
          <div className={styles.empty}>
            <Package className={styles.emptyIcon} />
            <p>В момента няма налични продукти</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {activeProducts.map((product) => {
              const img = currentType === "books" ? product.book_img : product.merch_img
              const name = currentType === "books" ? product.book_name : product.merch_name
              const price = currentType === "books" ? product.book_price_in_euro : product.merch_price_in_euro

              const priceInBGN = price * EUR_TO_BGN
              const priceInEUR = price

              return (
                <button key={product.id} onClick={() => handleProductClick(product)} className={styles.productCard}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={img}
                      alt={name} 
                      fill
                      placeholder="blur"
                      blurDataURL={img}
                      priority
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{name}</h3>
                    <div className={styles.priceContainer}>
                      <p className={styles.productPrice}>{priceInBGN.toFixed(2)} лв</p>
                      <p className={styles.productPriceSecondary}>(€{priceInEUR.toFixed(2)})</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
