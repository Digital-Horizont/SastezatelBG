"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"

import SideBar from "@/components/Sections/Platform/SideBar"
import ThemeContent from "@/components/Sections/Platform/ThemeContent"
import EasyPayModal from "@/components/Sections/Platform/EasyPayModal"
import BankModal from "@/components/Sections/Platform/BankModal"
import DecorativeWave from "@/components/Sections/Shared/DecorativeWave"

import { useThemeStore } from "@/stores/Platform/useThemeStore"
import { PLATFORM_3_4_PRICE } from "@/constants/platform"

import styles from "./page.module.css"

export default function ThemePageClient({ themes, initialSelectedKey, platformLink }) {
  const { themeId } = useParams()
  const hydrate = useThemeStore((s) => s.hydrate)
  const setSelectedThemeByKey = useThemeStore((s) => s.setSelectedThemeByKey)

  useEffect(() => {
    hydrate(themes || [], platformLink)
  }, [hydrate, themes, platformLink])

  useEffect(() => {
    const key = themeId ?? initialSelectedKey
    if (key) setSelectedThemeByKey(key)
  }, [themeId, initialSelectedKey, setSelectedThemeByKey])

  return (
    <>
      <DecorativeWave />
      <div className={styles.grid}>
        <SideBar platform_url="platform-3-4" />
        <ThemeContent platform_title="Платорма 3-4 кл" platform_link={"https://platform.sastezatel.bg/course/platforma-3-4kl"} payment_link={"https://platform.sastezatel.bg/checkout/tmlxbpas4xqiukt"} />
        <EasyPayModal price={PLATFORM_3_4_PRICE} platform_key="platform-3-4" platform_name="Абонамент за платформа 3-4 клас"/>
        <BankModal price={PLATFORM_3_4_PRICE} platform_key="platform-3-4" platform_name="Абонамент за платформа 3-4 клас"/>
      </div>
      <DecorativeWave rotated />
    </>
  )
}
