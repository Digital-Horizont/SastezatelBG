"use client"
import { useEffect, useMemo, useState } from "react"
import { Video, Play, Smartphone, BookOpen, Landmark, CreditCard } from "lucide-react"
import styles from "./ThemeContent.module.css"
import { useSelectedTheme } from "@/stores/Platform/useThemeStore"
import { useEasyPayStore } from "@/stores/Platform/useEasyPayStore"

const getYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  const match = url?.match(regex)
  return match ? match[1] : null
}

const getYouTubeThumbnail = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

export default function ThemeContent() {
  const selectedTheme = useSelectedTheme()
  const openEasyPay = useEasyPayStore((s) => s.open)
  const [showVideo, setShowVideo] = useState(false)

  const handleBankTransfer = () => {}
  const handleCardPayment = () => {
    window.open("https://sicademybg.skillplate.com/course/platforma-3-4kl", "_blank")
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
      {/* background bubbles */}
      <div className={`${styles.bubble} ${styles.bubble1}`} />
      <div className={`${styles.bubble} ${styles.bubble2}`} />
      <div className={`${styles.bubble} ${styles.bubble3}`} />

      {/* Заглавие */}
      <div className={styles.card}>
        <div className={styles.pad}>
          <h1 className={styles.title}>
            <span className={styles.titleIconWrap} aria-hidden>
              <BookOpen className={styles.titleIcon} />
            </span>
            <span>Платформа 3-4 кл</span>
          </h1>
        </div>
      </div>

      {/* CTA зона без card – между заглавието и съдържанието */}
      <div>
        <div className={styles.ctaRow}>
          <button className={styles.primaryBtn} onClick={openEasyPay}>
            <Smartphone className={styles.btnIcon} aria-hidden />
            Абонамент с ИзиПей
          </button>

          <button className={styles.primaryBtn} onClick={handleBankTransfer} aria-label="Плащане по банков път">
            <Landmark className={styles.btnIcon} aria-hidden />
            Банков превод
          </button>

          <button className={styles.primaryBtn} onClick={handleCardPayment} aria-label="Плащане с карта">
            <CreditCard className={styles.btnIcon} aria-hidden />
            Плащане с карта
          </button>
        </div>
      </div>

      {/* Основно съдържание на темата */}
      <div className={styles.card}>
        <div className={`${styles.pad} ${styles.contentStack}`}>
          <div className={styles.article}>
            {/* Видеото е първо в DOM и „плува“ вдясно, текстът го обтича */}
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

            {/* Текстът започва вляво и при нужда продължава под видеото */}
            <div>
              <h2 className={styles.themeHeading}>{selectedTheme.title}</h2>
              <p className={styles.desc}>{selectedTheme.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
