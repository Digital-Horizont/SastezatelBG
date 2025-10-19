"use client";

import Link from "next/link";
import styles from "./BackLink.module.css";

export default function BackLink({ type }) {
  const backType = type === "books" ? "books" : "merch";
  return (
    <Link className={styles.back} href={`/shop?type=${backType}`}>
      &larr; Назад към книжарницата
    </Link>
  );
}
