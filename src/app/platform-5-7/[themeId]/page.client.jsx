"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import SideBar from "@/components/Sections/Platform/SideBar";
import ThemeContent from "@/components/Sections/Platform/ThemeContent";
import EasyPayModal from "@/components/Sections/Platform/EasyPayModal";
import BankModal from "@/components/Sections/Platform/BankModal";
import DecorativeWave from "@/components/Sections/Shared/DecorativeWave";

import { useThemeStore } from "@/stores/Platform/useThemeStore";
import { PLATFORM_5_7_PRICE } from "@/constants/platform";

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
        <SideBar platform_url="platform-5-7" />
        <ThemeContent platform_title={"Платорма 5-7 кл"} platform_link={"https://sicademybg.skillplate.com/course/platforma-5-7kl"}/>
        <EasyPayModal price={PLATFORM_5_7_PRICE} platform_key="platform-5-7" platform_name="Абонамент за платформа 5-7 клас"/>
        <BankModal price={PLATFORM_5_7_PRICE} platform_key="platform-5-7" platform_name="Абонамент за платформа 5-7 клас"/>
      </div>
      <DecorativeWave rotated />
    </>
  );
}
