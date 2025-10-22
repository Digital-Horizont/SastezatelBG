"use client";

import { useState } from "react";
import { FaBullseye, FaFlag, FaHandshake } from "react-icons/fa";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [active, setActive] = useState(null);

  const cards = [
    {
      title: "Нашата мисия",
      icon: <FaBullseye size={40} color="#047857" />,
      content:
        "Да вдъхновим ученици, учители и любители да се занимават със състезателна математика, като я направим по-достъпна и приятна за изучаване.",
    },
    {
      title: "Нашата цел",
      icon: <FaFlag size={40} color="#047857" />,
      content:
        "Да предоставим синтезирани материали, които да улеснят всички при изучаването на състезателната математика.",
    },
    {
      title: "Нашият подход",
      icon: <FaHandshake size={40} color="#047857" />,
      content:
        "Разработваме образователни онлайн платформи и помагала, в които се разглеждат видеа с теоретични части, както и задачи за самостоятелна работа. Всяка една задача е подробно решена на съответната платформа.",
    },
  ];

  const toggle = (idx) => {
    setActive((prev) => (prev === idx ? null : idx));
  };

  const handlePress = (e, idx) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    e.currentTarget.style.setProperty("--rx", `${x}%`);
    e.currentTarget.style.setProperty("--ry", `${y}%`);

    toggle(idx);
  };

  const handleKey = (e, idx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(idx);
    }
  };

  return (
    <section className={styles.hero}>
      <div className={`${styles.bubble} ${styles.bubble1}`} />
      <div className={`${styles.bubble} ${styles.bubble2}`} />
      <div className={`${styles.bubble} ${styles.bubble3}`} />

      <div className={styles.header}>
        <h1>
          За{" "}
          <span className={styles.highlight}>
            нас
            <div className={styles.underline} />
          </span>
        </h1>
        <p>
        Състезател.БГ е за всеки, който се интересува от състезания по математика. Екипът ни, който е с дългогодишен опит в състезателната математика, е подготвил всички теми за 3 и 4 клас.
        <br />
        <br />
        При нас ще намерите много теоретични видеа, задачи за упражнение, както и подробни решения на тези задачи.
        </p>
      </div>

      {/* Desktop layout */}
      <div className={styles.desktopGrid} role="list">
        {cards.map((c) => (
          <article key={c.title} className={styles.card} role="listitem">
            <div className={styles.icon}>{c.icon}</div>
            <h2>{c.title}</h2>
            <p>{c.content}</p>
          </article>
        ))}
      </div>

      {/* Mobile accordion */}
      <div className={styles.mobileList} role="list">
        {cards.map((c, idx) => {
          const isActive = active === idx;
          const panelId = `panel-${idx}`;
          const btnId = `accordion-${idx}`;

          return (
            <button
              key={c.title}
              id={btnId}
              className={`${styles.mobileCard} ${
                isActive ? styles.active : ""
              }`}
              onClick={(e) => handlePress(e, idx)}
              onKeyDown={(e) => handleKey(e, idx)}
              aria-expanded={isActive}
              aria-controls={panelId}
            >
              <div className={styles.mobileHeader}>
                <div className={styles.icon}>{c.icon}</div>
                <h2 className={styles.mobileTitle}>{c.title}</h2>
                <span
                  className={`${styles.chevron} ${
                    isActive ? styles.chevronOpen : ""
                  }`}
                  aria-hidden="true"
                />
              </div>

              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className={`${styles.revealWrap} ${
                  isActive ? styles.revealOpen : ""
                }`}
              >
                <p className={styles.revealContent}>{c.content}</p>
              </div>

              <span className={styles.ripple} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
