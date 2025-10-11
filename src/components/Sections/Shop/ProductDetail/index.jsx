"use client";

import styles from "./ProductDetail.module.css";

export default function ProductDetail({ backSlot, gallerySlot, infoSlot, actionsSlot }) {
  return (
    <main className={styles.wrap}>
      <div className={styles.backRow}>{backSlot}</div>

      <section className={styles.card}>
        <div className={styles.grid}>
          <div className={styles.infoCol}>
            {infoSlot}
            <div className={styles.actionsRow}>{actionsSlot}</div>
          </div>

          <div className={styles.mediaCol}>{gallerySlot}</div>
        </div>
      </section>
    </main>
  );
}
