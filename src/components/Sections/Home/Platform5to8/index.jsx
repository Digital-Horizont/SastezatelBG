import React from "react";
import styles from "./Platform5to8Section.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaLaptopCode } from "react-icons/fa";

export default function Platform5to8Section() {
  return (
    <section className={styles.section}>
      <div className={styles.decoTopRight} />
      <div className={styles.decoBottomLeft} />

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.mediaGroup}>
            <div className={styles.mediaGlow} />
            <div className={styles.card}>
              <Image
                src="/assets/reklama_5_8_klas.png"
                alt="Платформа за ученици 5-8 клас"
                className={styles.cardImg}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                placeholder="blur"
                blurDataURL="/assets/reklama_5_8_klas.png"
                priority={false}
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
                5 – 8 клас
                <div className={styles.titleUnderline} />
              </span>
            </h2>

            <div className={styles.paragraphs}>
              <p className={styles.lead}>
                Нашата платформа за 5, 6, 7 и 8 клас разглежда теми, изучавани в извънкласната подготовка за тези класове. Разглеждат се задачи от четирите основни дяла на състезателната математика - Алгебра, Геометрия, Теория на числата и Комбинаторика. Платформата е с платен абонамент, който дава достъп до видео съдържание, както и до онлайн общност.
              </p>
            </div>

            <Link href="/platform-5-8/info-5-8">
              <button className={styles.cta}>
                <span className={styles.ctaInner}>
                  Вижте повече
                  <FaArrowRight className={styles.ctaIcon} />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
