"use client";
import React from "react";
import Link from "next/link";
import { BookOpen, Video } from "lucide-react";
import styles from "./SideBar.module.css";
import { useThemeStore, useSelectedTheme } from "@/stores/Platform/useThemeStore";

export default function SideBar() {
  const themes = useThemeStore((s) => s.themes);
  const setSelectedThemeByKey = useThemeStore((s) => s.setSelectedThemeByKey);
  const selectedTheme = useSelectedTheme();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <div className={styles.pad}>
          <h2 className={styles.title}>
            <BookOpen className={styles.icon} />
            <span>Теми</span>
          </h2>

          <div className={styles.list}>
            {themes.map((t) => {
              const active = selectedTheme?.key === t.key;
              return (
                <Link
                  key={t.key}
                  href={`/platform-3-5/${t.key}`}
                  onClick={() => setSelectedThemeByKey(t.key)}  // ✅ instant UI update
                  className={`${styles.item} ${active ? styles.itemActive : styles.itemInactive}`}
                >
                  <span className={styles.itemTitle}>{t.title}</span>
                  {t.yt_video ? <Video className={styles.iconXs} /> : null}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
