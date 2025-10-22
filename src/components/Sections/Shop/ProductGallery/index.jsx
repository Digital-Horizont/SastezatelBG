"use client";

import styles from "./ProductGallery.module.css";

import Image from "next/image";

export default function ProductGallery({ src, alt }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.bordered}>
        <Image
          src={src}
          alt={alt} 
          fill
          placeholder="blur"
          blurDataURL={src}
          priority
        />
      </div>
    </div>
  );
}
