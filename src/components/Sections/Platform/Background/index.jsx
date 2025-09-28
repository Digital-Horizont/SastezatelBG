import React from "react";
import styles from "./Background.module.css";

export default function Background() {
  return (
    <div className={styles.mainBg} aria-hidden="true">
      <div className={`${styles.blob} ${styles.topRight}`} />
      <div className={`${styles.blob} ${styles.bottomLeft}`} />
      <div className={`${styles.blob} ${styles.middle}`} />
    </div>
  );
}
