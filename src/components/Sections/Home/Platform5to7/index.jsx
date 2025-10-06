import React from "react";
import styles from "./Platform5to7Section.module.css";
import { FaArrowRight, FaLaptopCode } from "react-icons/fa";

export default function Platform5to7Section() {
  return (
    <section className={styles.section}>
      <div className={styles.decoTopRight} />
      <div className={styles.decoBottomLeft} />

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.mediaGroup}>
            <div className={styles.mediaGlow} />
            <div className={styles.card}>
              <img
                src="/teenagers-studying-with-advanced-technology-and-la.png"
                alt="Платформа за ученици 5-7 клас"
                className={styles.cardImg}
              />
              <div className={styles.cardOverlay} />
              <div className={styles.badge}>
                <FaLaptopCode className={styles.badgeIcon} />
              </div>
            </div>
          </div>

          <div className={styles.textCol}>
            <h2 className={styles.title}>
              Платформа{" "}
              <span className={styles.titleAccent}>
                5 – 7 клас
                <div className={styles.titleUnderline} />
              </span>
            </h2>

            <div className={styles.paragraphs}>
              <p className={styles.lead}>
                Нашата платформа за 5, 6 и 7 клас разглежда теми, изучавани в извънкласната подготовка за тези класове. Разглеждат се задачи от четирите основни дяла на състезателната математика - Алгебра, Геометрия, Теория на числата и Комбинаторика. Платформата е с платен абонамент, който дава достъп до видео съдържание, както и до онлайн общност.
              </p>
            </div>

            <button className={styles.cta}>
              <span className={styles.ctaInner}>
                Вижте повече
                <FaArrowRight className={styles.ctaIcon} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
