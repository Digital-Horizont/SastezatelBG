"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import Background from "@/components/Sections/Platform/Background";
import SideBar from "@/components/Sections/Platform/SideBar";
import ThemeContent from "@/components/Sections/Platform/ThemeContent";
import EasyPayModal from "@/components/Sections/Platform/EasyPayModal";

import { useThemeStore } from "@/stores/Platform/useThemeStore";

import styles from "./page.module.css";

export default function ThemePageClient() {
  const { themeId } = useParams();
  const setSelectedThemeByKey = useThemeStore((s) => s.setSelectedThemeByKey);

  useEffect(() => {
    if (themeId) setSelectedThemeByKey(themeId);
  }, [themeId, setSelectedThemeByKey]);

  return (
    <>
      <Background />
      <div className={styles.grid}>
        <SideBar className={styles.sideBar} />
        <ThemeContent className={styles.themeContent} />
        <EasyPayModal className={styles.easyPayModal} />
      </div>
    </>
  );
}
