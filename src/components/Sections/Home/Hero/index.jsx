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
        "Да предоставяме иновативни и качествени решения, които помагат на нашите клиенти да постигат своите цели и да развиват бизнеса си устойчиво.",
    },
    {
      title: "Нашата цел",
      icon: <FaFlag size={40} color="#047857" />,
      content:
        "Да станем водещ партньор в нашата област, като изграждаме дългосрочни отношения, базирани на доверие, качество и взаимна полза.",
    },
    {
      title: "Нашият подход",
      icon: <FaHandshake size={40} color="#047857" />,
      content:
        "Работим в тясно сътрудничество с клиентите си, като слушаме техните нужди и предлагаме персонализирани решения с внимание към детайла.",
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
          Ние сме екип от професионалисти, посветени на предоставянето на
          най-добрите решения за нашите клиенти. С години опит и страст към
          иновациите, ние се стремим да превъзхождаме очакванията и да създаваме
          стойност.
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
