"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import SideBar from "@/components/Sections/Platform/SideBar";
import ThemeContent from "@/components/Sections/Platform/ThemeContent";
import EasyPayModal from "@/components/Sections/Platform/EasyPayModal";
import DecorativeWave from "@/components/Sections/Shared/DecorativeWave";

import { useThemeStore } from "@/stores/Platform/useThemeStore";

import styles from "./page.module.css";

export default function ThemePageClient({ themes, initialSelectedKey, platformLink }) {
  const { themeId } = useParams();
  const hydrate = useThemeStore((s) => s.hydrate);
  const setSelectedThemeByKey = useThemeStore((s) => s.setSelectedThemeByKey);

  useEffect(() => {
    hydrate(themes || [], platformLink);
  }, [hydrate, themes, platformLink]);

  useEffect(() => {
    const key = themeId ?? initialSelectedKey;
    if (key) setSelectedThemeByKey(key);
  }, [themeId, initialSelectedKey, setSelectedThemeByKey]);

  return (
    <>
      <DecorativeWave />
      <div className={styles.grid}>
        <SideBar className={styles.sideBar} platform_url="platform-3-4" />
        <ThemeContent className={styles.themeContent} />
        <EasyPayModal className={styles.easyPayModal} />
      </div>
      <DecorativeWave rotated />
    </>
  );
}
