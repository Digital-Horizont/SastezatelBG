import React from "react";
import styles from "./Footer.module.css";
import {
  LuUser,
  LuGraduationCap,
  LuShoppingBag,
  LuShieldCheck,
  LuFileText,
  LuCookie,
  LuFacebook,
  LuInstagram,
} from "react-icons/lu";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div aria-hidden="true" className={styles.gradTop} />
      <div aria-hidden="true" className={styles.blobRight} />
      <div aria-hidden="true" className={styles.blobLeft} />

      <div className={styles.container}>
        <div className={styles.hr} />

        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3 className={styles.brandTitle}>Образователна платформа</h3>
            <p className={styles.brandText}>
              Вдъхновяваме младите умове да учат, растат и създават бъдещето
              чрез иновативни образователни решения и технологии.
            </p>
          </div>

          <nav className={styles.column} aria-label="Платформи">
            <h4 className={styles.columnTitle}>Платформи</h4>
            <ul className={styles.list}>
              <li>
                <a href="#" className={styles.link}>
                  <LuUser className={styles.icon} aria-hidden="true" />
                  <span>Платформа 3-4 клас</span>
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  <LuGraduationCap className={styles.icon} aria-hidden="true" />
                  <span>Платформа 5-7 клас</span>
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  <LuShoppingBag className={styles.icon} aria-hidden="true" />
                  <span>Книги и Мърч</span>
                </a>
              </li>
            </ul>
          </nav>

          <nav className={styles.column} aria-label="Информация">
            <h4 className={styles.columnTitle}>Информация</h4>
            <ul className={styles.list}>
              <li>
                <a href="#" className={styles.link}>
                  <LuShieldCheck className={styles.icon} aria-hidden="true" />
                  <span>Политика за поверителност</span>
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  <LuFileText className={styles.icon} aria-hidden="true" />
                  <span>Условия за ползване</span>
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  <LuCookie className={styles.icon} aria-hidden="true" />
                  <span>Бисквитки</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.socialWrap}>
            <span className={styles.followText}>Следвайте ни:</span>
            <div className={styles.socials}>
              <a href="#" className={`${styles.socialBtn} ${styles.fb}`} aria-label="Facebook">
                <LuFacebook aria-hidden="true" />
              </a>
              <a href="#" className={`${styles.socialBtn} ${styles.ig}`} aria-label="Instagram">
                <LuInstagram aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className={styles.copyWrap}>
            <p className={styles.copy}>© 2025 Образователна платформа. Всички права запазени.</p>
            <p className={styles.credit}>
              Създадено от{" "}
              <a
                href="https://aleksanderdimitrov.dev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.creditLink}
              >
                aleksanderdimitrov
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
