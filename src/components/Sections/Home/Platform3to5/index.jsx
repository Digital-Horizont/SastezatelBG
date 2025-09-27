import React from "react";
import styles from "./Platform3to5Section.module.css";
import { FaArrowRight, FaGraduationCap } from "react-icons/fa";

export default function Platform3to5Section() {
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
                3 – 5 клас
                <div className={styles.titleUnderline} />
              </span>
            </h2>

            <div className={styles.paragraphs}>
              <p className={styles.lead}>
                Нашата интерактивна платформа за ученици от 3 до 5 клас предлага увлекателни и образователни дейности,
                които развиват критичното мислене и творческите способности.
              </p>
              <p className={styles.lead}>
                Чрез игрови подход и персонализирано обучение, всяко дете може да учи в свой собствен темп и да открива
                радостта от знанието.
              </p>
            </div>

            <button className={styles.cta}>
              <span className={styles.ctaInner}>
                Вижте повече
                <FaArrowRight className={styles.ctaIcon} />
              </span>
            </button>
          </div>

          {/* Image */}
          <div className={styles.mediaGroup}>
            <div className={styles.mediaGlow} />
            <div className={styles.card}>
              <img
                src="/children-learning-on-tablets-and-computers-in-colo.png"
                alt="Платформа за ученици 3-5 клас"
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
