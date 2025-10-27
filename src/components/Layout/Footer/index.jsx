import styles from "./Footer.module.css";
import Link from "next/link";

import {
  LuUser,
  LuGraduationCap,
  LuShoppingBag,
  LuShieldCheck,
  LuFileText,
  LuCookie,
  LuFacebook,
  LuInstagram,
  LuMail,
  LuPhone,
  LuYoutube,
  LuLinkedin,
} from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";

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
              Вдъхновяваме младите умове да учат, растат и създават бъдещето чрез иновативни образователни решения и
              технологии.
            </p>
          </div>

          <nav className={styles.column} aria-label="Платформи">
            <h4 className={styles.columnTitle}>Платформи</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/platform-3-4/info-3-4" className={styles.link}>
                  <LuUser className={styles.icon} aria-hidden="true" />
                  <span>Платформа 3-4 клас</span>
                </Link>
              </li>
              <li>
                <Link href="/platform-5-8/info-5-8" className={styles.link}>
                  <LuGraduationCap className={styles.icon} aria-hidden="true" />
                  <span>Платформа 5-8 клас</span>
                </Link>
              </li>
              <li>
                <Link href="/shop" className={styles.link}>
                  <LuShoppingBag className={styles.icon} aria-hidden="true" />
                  <span>Книги</span>
                </Link>
              </li>
            </ul>
          </nav>

          <nav className={styles.column} aria-label="Информация">
            <h4 className={styles.columnTitle}>Информация</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/privacy-policy" className={styles.link}>
                  <LuShieldCheck className={styles.icon} aria-hidden="true" />
                  <span>Политика за поверителност</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-services" className={styles.link}>
                  <LuFileText className={styles.icon} aria-hidden="true" />
                  <span>Условия за ползване</span>
                </Link>
              </li>
              <li>
                <Link href="/cookies" className={styles.link}>
                  <LuCookie className={styles.icon} aria-hidden="true" />
                  <span>Бисквитки</span>
                </Link>
              </li>
            </ul>
          </nav>

          <nav className={styles.column} aria-label="Контакти">
            <h4 className={styles.columnTitle}>Контакти</h4>
            <ul className={styles.list}>
              <li>
                <a href="tel:+359899856334" className={styles.link}>
                  <LuPhone className={styles.icon} aria-hidden="true" />
                  <span>+359 899 856 334</span>
                </a>
              </li>
              <li>
                <a href="mailto:sales@sastezatel.bg" className={styles.link}>
                  <LuMail className={styles.icon} aria-hidden="true" />
                  <span>sales@sastezatel.bg</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.socialWrap}>
            <span className={styles.followText}>Следвайте ни:</span>
            <div className={styles.socials}>
              <a
                href="https://www.facebook.com/SIcademy"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialBtn} ${styles.fb}`}
                aria-label="Facebook"
              >
                <LuFacebook aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/sicademybg"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialBtn} ${styles.ig}`}
                aria-label="Instagram"
              >
                <LuInstagram aria-hidden="true" />
              </a>
              <a
                href="https://www.youtube.com/@SicademyBG"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialBtn} ${styles.yt}`}
                aria-label="YouTube"
              >
                <LuYoutube aria-hidden="true" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialBtn} ${styles.x}`}
                aria-label="X (Twitter)"
              >
                <FaXTwitter aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/sicademy/people/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialBtn} ${styles.in}`}
                aria-label="LinkedIn"
              >
                <LuLinkedin aria-hidden="true" />
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
