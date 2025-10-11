"use client";

import styles from "./ProductGallery.module.css";

export default function ProductGallery({ src, alt }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.bordered}>
        <img className={styles.image} src={src || "/placeholder.svg"} alt={alt} />
      </div>
    </div>
  );
}
