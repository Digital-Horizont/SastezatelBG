"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Video } from "lucide-react"
import styles from "./SideBar.module.css"
import { useThemeStore, useSelectedTheme } from "@/stores/Platform/useThemeStore"

export default function SideBar({ platform_url }) {
  const themes = useThemeStore((s) => s.themes)
  const setSelectedThemeByKey = useThemeStore((s) => s.setSelectedThemeByKey)
  const selectedTheme = useSelectedTheme()
  const router = useRouter()

  const handleSelect = (key) => {
    if (!key) return
    setSelectedThemeByKey(key)
    router.push(`/${platform_url}/${key}`)
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <div className={styles.pad}>
          <h2 className={styles.title}>
            <BookOpen className={styles.icon} />
            <span>Теми</span>
          </h2>

          <div className={`${styles.mobileOnly} ${styles.mobileSelectWrap}`}>
            <label htmlFor="themeSelect" className={styles.mobileLabel}>
              Избери тема
            </label>
            <div className={styles.selectShell}>
              <select
                id="themeSelect"
                className={styles.mobileSelect}
                value={selectedTheme?.key ?? ""}
                onChange={(e) => handleSelect(e.target.value)}
              >
                <option value="" disabled>
                  — Изберете —
                </option>
                {themes.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.title}{t.yt_video ? " • Видео" : ""}
                  </option>
                ))}
              </select>
              <span className={styles.selectChevron} aria-hidden="true" />
            </div>
          </div>

          {/* Desktop list (hidden under 992px) */}
          <div className={`${styles.list} ${styles.desktopOnly}`}>
            {themes.map((t) => {
              const active = selectedTheme?.key === t.key
              return (
                <Link
                  key={t.key}
                  href={`/${platform_url}/${t.key}`}
                  onClick={() => setSelectedThemeByKey(t.key)}
                  className={`${styles.item} ${active ? styles.itemActive : styles.itemInactive}`}
                >
                  <span className={styles.itemTitle}>{t.title}</span>
                  {t.yt_video ? <Video className={styles.iconXs} /> : null}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}
