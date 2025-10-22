"use client"

import { useEffect, useMemo, useState } from "react"
import { Video, Play, Smartphone, BookOpen, Landmark, CreditCard } from "lucide-react"
import styles from "./ThemeContent.module.css"
import { useSelectedTheme } from "@/stores/Platform/useThemeStore"
import { useEasyPayStore } from "@/stores/Platform/useEasyPayStore"
import { useBankStore } from "@/stores/Platform/useBankStore"
import { getYouTubeThumbnail , getYouTubeVideoId } from "@/utils/yt"

export default function ThemeContent({ platform_title, platform_link }) {
  const selectedTheme = useSelectedTheme()
  const openEasyPay = useEasyPayStore((s) => s.open)
  const openBank = useBankStore((s) => s.open)

  const [showVideo, setShowVideo] = useState(false)

  const handleCardPayment = () => {
    window.open(platform_link, "_blank")
  }

  useEffect(() => setShowVideo(false), [selectedTheme?.key])

  const videoId = useMemo(
    () => (selectedTheme?.yt_video ? getYouTubeVideoId(selectedTheme.yt_video) : null),
    [selectedTheme?.yt_video],
  )

  if (!selectedTheme) {
    return (
      <section className={styles.wrap} aria-live="polite">
        <div className={`${styles.bubble} ${styles.bubble1}`} />
        <div className={`${styles.bubble} ${styles.bubble2}`} />
        <div className={`${styles.bubble} ${styles.bubble3}`} />
        <div className={styles.card}>
          <div className={styles.pad}>
            <div className={styles.empty}>
              <BookOpen className={styles.emptyIcon} aria-hidden />
              <p>Изберете тема от лявото меню</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.wrap}>
      <div className={`${styles.bubble} ${styles.bubble1}`} />
      <div className={`${styles.bubble} ${styles.bubble2}`} />
      <div className={`${styles.bubble} ${styles.bubble3}`} />

      <div className={styles.card}>
        <div className={styles.pad}>
          <h1 className={styles.title}>
            <div className={styles.titleLeft}>
              <span className={styles.titleIconWrap} aria-hidden>
                <BookOpen className={styles.titleIcon} />
              </span>
              <span>{platform_title}</span>
            </div>

            {platform_link && (
              <a
                href={platform_link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.platformLink}
                aria-label="Към платформата (отваря се в нов таб)"
              >
                Към платформата →
              </a>
            )}
          </h1>
        </div>
      </div>

      <div>
        <div className={styles.ctaRow}>
          <button className={styles.primaryBtn} onClick={openEasyPay}>
            <Smartphone className={styles.btnIcon} aria-hidden />
            Абонамент с ИзиПей
          </button>

          <button className={styles.primaryBtn} onClick={openBank} aria-label="Плащане по банков път">
            <Landmark className={styles.btnIcon} aria-hidden />
            Банков превод
          </button>

          <button className={styles.primaryBtn} onClick={handleCardPayment} aria-label="Плащане с карта">
            <CreditCard className={styles.btnIcon} aria-hidden />
            Плащане с карта
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={`${styles.pad} ${styles.contentStack}`}>
          <div className={styles.article}>
            {videoId ? (
              <div className={styles.videoFloat}>
                <h3 className={styles.videoTitle}>
                  <Video className={styles.videoIcon} aria-hidden />
                  Видео урок
                </h3>

                {!showVideo ? (
                  <button
                    className={styles.poster}
                    onClick={() => setShowVideo(true)}
                    aria-label={`Пусни видеото: ${selectedTheme.title}`}
                  >
                    <img
                      src={getYouTubeThumbnail(videoId)}
                      alt=""
                      className={styles.posterImg}
                      onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                    />
                    <span className={styles.posterOverlay} aria-hidden>
                      <span className={styles.playCircle}>
                        <Play className={styles.playIcon} />
                      </span>
                    </span>
                  </button>
                ) : (
                  <div className={styles.iframeWrap}>
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                      title={selectedTheme.title}
                      className={styles.iframe}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            ) : null}

            <div>
              <h2 className={styles.themeHeading}>{selectedTheme.title}</h2>
              <p
                className={styles.desc}
                dangerouslySetInnerHTML={{
                  __html: selectedTheme.description.replace(
                    /\(([^)]+)\)<((?:https?:\/\/|mailto:)[^>]+)>/g,
                    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
                  ),
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
