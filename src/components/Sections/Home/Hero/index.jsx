"use client";

import { useState } from "react";
import { FaBullseye, FaFlag, FaHandshake } from "react-icons/fa";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [active, setActive] = useState(0); // which card is expanded on mobile

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

  // toggle on mobile
  const handleMobileClick = (idx) => {
    setActive((prev) => (prev === idx ? null : idx));
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
            <div className={styles.underline}></div>
          </span>
        </h1>
        <p>
          Ние сме екип от професионалисти, посветени на предоставянето на
          най-добрите решения за нашите клиенти. С години опит и страст към
          иновациите, ние се стремим да превъзхождаме очакванията и да създаваме
          стойност.
        </p>
      </div>

      {/* Desktop grid (equally spaced) */}
      <div className={styles.desktopGrid}>
        {cards.map((c) => (
          <article key={c.title} className={styles.card} role="listitem">
            <div className={styles.icon}>{c.icon}</div>
            <h2>{c.title}</h2>
            <p>{c.content}</p>
          </article>
        ))}
      </div>

      {/* Mobile stacked list */}
      <div className={styles.mobileList} role="list">
        {cards.map((c, idx) => {
          const isActive = active === idx;
          return (
            <button
              key={c.title}
              className={`${styles.mobileCard} ${isActive ? styles.active : ""}`}
              onClick={() => handleMobileClick(idx)}
              aria-expanded={isActive}
            >
              <div className={styles.mobileHeader}>
                <div className={styles.icon}>{c.icon}</div>
                <h2>{c.title}</h2>
                <span
                  className={`${styles.chevron} ${
                    isActive ? styles.chevronOpen : ""
                  }`}
                  aria-hidden
                />
              </div>

              {/* animated content reveal */}
              <div className={styles.revealWrap}>
                <p className={styles.revealContent}>{c.content}</p>
              </div>

              {/* click ripple */}
              <span className={styles.ripple} aria-hidden />
            </button>
          );
        })}
      </div>
    </section>
  );
}
