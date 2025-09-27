import React from "react";
import { FaEye, FaArrowRight } from "react-icons/fa";

import styles from "./BooksAndMerchSection.module.css";

export default function BooksAndMerchSection() {
  return (
    <section className={styles.section}>
      {/* Decorative Elements */}
      <div className={styles.decorOne} />
      <div className={styles.decorTwo} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Книги и{" "}
            <span className={styles.highlight}>
              мърч
              <span className={styles.highlightUnderline} />
            </span>
          </h2>
          <p className={styles.subtitle}>
            Открийте нашата колекция от образователни книги и уникални продукти,
            създадени специално за младите умове.
          </p>
        </div>

        {/* Gallery */}
        <div className={styles.grid}>
          {/* Книги */}
          <div className={styles.card}>
            <div className={`${styles.media} ${styles.mediaBooks}`}>
              <img
                src="/children-educational-books.png"
                alt="Образователни книги"
                className={styles.mediaImg}
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Книги</h3>
              <p className={styles.cardText}>Образователни книги за всички възрасти</p>
            </div>
            <div className={`${styles.overlay} ${styles.overlayEmerald}`}>
              <FaEye className={styles.icon} />
            </div>
          </div>

          {/* Мърч */}
          <div className={styles.card}>
            <div className={`${styles.media} ${styles.mediaMerch}`}>
              <img
                src="/educational-merchandise-t-shirts-mugs-backpacks.png"
                alt="Образователен мърч"
                className={styles.mediaImg}
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Мърч</h3>
              <p className={styles.cardText}>Тениски, чаши, раници и още</p>
            </div>
            <div className={`${styles.overlay} ${styles.overlayTeal}`}>
              <FaEye className={styles.icon} />
            </div>
          </div>
        </div>

        {/* Button */}
        <button className={styles.ctaBtn} type="button">
          <span className={styles.ctaContent}>
            Вижте повече
            <FaArrowRight className={styles.ctaIcon} />
          </span>
        </button>
      </div>
    </section>
  );
}
