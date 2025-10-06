"use client";

import { useRef, useState } from "react";
import { FaBullseye, FaFlag, FaHandshake } from "react-icons/fa";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [active, setActive] = useState(null);
  const contentRefs = useRef([]);

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

  // ripple позиция + toggle
  const handlePress = (e, idx) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--rx", `${x}%`);
    e.currentTarget.style.setProperty("--ry", `${y}%`);
    toggle(idx);
  };

  // достъпност: Enter/Space
  const handleKey = (e, idx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(idx);
    }
  };

  return (
    <section className={styles.hero}>
      {/* Background bubbles */}
      <div className={`${styles.bubble} ${styles.bubble1}`} />
      <div className={`${styles.bubble} ${styles.bubble2}`} />
      <div className={`${styles.bubble} ${styles.bubble3}`} />

      <div className={styles.header}>
        <h1>
          Кои сме{" "}
          <span className={styles.highlight}>
            ние
            <div className={styles.underline} />
          </span>
        </h1>
        <p>
          Ние сме екип от бивши състезатели по математика с дългогодишен опит в преподаването на състезателна математика за ученици от всички възрастови групи. Имаме богат опит в подготовката на ученици за олимпиади, както и в разработването на допълнителни материали. Двама от преподавателите в нашия екип са Станислав Димитров и Станислав Чобанов, съавтори на сборника "555 Задачи по Геометрия".
        </p>
      </div>

      {/* Desktop grid */}
      <div className={styles.desktopGrid} role="list">
        {cards.map((c) => (
          <article key={c.title} className={styles.card} role="listitem">
            <div className={styles.icon}>{c.icon}</div>
            <h2>{c.title}</h2>
            <p>{c.content}</p>
          </article>
        ))}
      </div>

      {/* Mobile accordeon */}
      <div className={styles.mobileList} role="list">
        {cards.map((c, idx) => {
          const isActive = active === idx;
          const panelId = `panel-${idx}`;
          const btnId = `accordion-${idx}`;

          return (
            <button
              key={c.title}
              id={btnId}
              className={`${styles.mobileCard} ${isActive ? styles.active : ""}`}
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
                  aria-hidden
                />
              </div>

              {/* Animated content reveal */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                ref={(el) => (contentRefs.current[idx] = el)}
                className={styles.revealWrap}
                style={{
                  height: isActive
                    ? contentRefs.current[idx]?.scrollHeight ?? "auto"
                    : 0,
                }}
              >
                <p className={styles.revealContent}>{c.content}</p>
              </div>

              {/* ripple */}
              <span className={styles.ripple} aria-hidden />
            </button>
          );
        })}
      </div>
    </section>
  );
}
