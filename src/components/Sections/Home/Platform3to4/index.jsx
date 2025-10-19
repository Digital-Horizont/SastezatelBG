import React from "react";
import styles from "./Platform3to4Section.module.css";
import Link from "next/link";
import { FaArrowRight, FaGraduationCap } from "react-icons/fa";

export default function Platform3to4Section() {
  return (
    <section className={styles.section}>
      {/* Decorative Elements */}
      <div className={styles.decoTopRight} />
      <div className={styles.decoBottomLeft} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Text Content */}
          <div className={styles.textCol}>
            <h2 className={styles.title}>
              Платформа{" "}
              <span className={styles.titleAccent}>
                3 – 4 клас
                <div className={styles.titleUnderline} />
              </span>
            </h2>

            <div className={styles.paragraphs}>
              <p className={styles.lead}>
               Нашата платформа за 3 и 4 клас съдържа всичкия необходим материал, който се изучава в извънкласната подготовка за тези класове. Всички задачи са синтезирани по методи и трудност, като са събирани от всички по-известни състезания за 3 и 4 клас. Платформата е с платен абонамент, който дава достъп до видео съдържание, както и до онлайн общност.
              </p>
            </div>

            <Link href="/platform-5-7/info-5-8">
              <button className={styles.cta}>
                  <span className={styles.ctaInner}>
                    Вижте повече
                    <FaArrowRight className={styles.ctaIcon} />
                  </span>
              </button>
            </Link>
          </div>

          {/* Image */}
          <div className={styles.mediaGroup}>
            <div className={styles.mediaGlow} />
            <div className={styles.card}>
              <img
                src="/assets/reklama_3_4_klas.png"
                alt="Платформа за ученици 3-4 клас"
                className={styles.cardImg}
              />
              <div className={styles.cardOverlay} />
              <div className={styles.badge}>
                <FaGraduationCap className={styles.badgeIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
