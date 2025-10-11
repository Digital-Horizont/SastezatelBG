"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkClasses = (path, isMobile = false) => {
    const base = isMobile ? styles.linkBaseMobile : styles.linkBaseDesktop;
    const active = isMobile ? styles.activeMobile : styles.activeDesktop;
    const inactive = isMobile ? styles.inactiveMobile : styles.inactiveDesktop;
    return [base, isActive(path) ? active : inactive].join(" ");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.wrap}>
        <div className={styles.row}>
          <div className={styles.brandWrap}>
            <div className={styles.brandMark}>
              <span className={styles.brandLetter}>С</span>
            </div>
            <span className={styles.brandName}>СъстезателБГ</span>
          </div>

          {/* Desktop navigation */}
          <div className={styles.desktopNav}>
            <Link href="/" className={getLinkClasses("/")}>
              Начало
            </Link>
            <Link href="/platform-3-4" className={getLinkClasses("/platform-3-4")}>
              Платформа 3 - 4 клас
            </Link>
            <Link href="/platform-5-7" className={getLinkClasses("/platform-5-7")}>
              Платформа 5 - 7 клас
            </Link>
            <Link href="/shop" className={getLinkClasses("/shop")}>
              Книги
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className={styles.mobileToggle}>
            <button onClick={toggleMenu} className={styles.toggleBtn} aria-label="Toggle menu">
              <svg className={styles.toggleIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className={styles.mobileNav}>
            <div className={styles.mobileInner}>
              <Link href="/" className={getLinkClasses("/", true)} onClick={() => setIsMenuOpen(false)}>
                Начало
              </Link>
              <Link
                href="/platform-3-4"
                className={getLinkClasses("/platform-3-4", true)}
                onClick={() => setIsMenuOpen(false)}
              >
                Платформа 3 - 5 клас
              </Link>
              <Link
                href="/platform-5-7"
                className={getLinkClasses("/platform-5-7", true)}
                onClick={() => setIsMenuOpen(false)}
              >
                Платформа 5 - 7 клас
              </Link>
              <Link
                href="/shop"
                className={getLinkClasses("/shop", true)}
                onClick={() => setIsMenuOpen(false)}
              >
                Книги и Мърч
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
