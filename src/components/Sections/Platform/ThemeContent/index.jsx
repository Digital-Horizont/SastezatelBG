"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Video, Play, Smartphone, BookOpen } from "lucide-react";
import styles from "./ThemeContent.module.css";
import { useSelectedTheme } from "@/stores/Platform/useThemeStore";
import { useEasyPayStore } from "@/stores/Platform/useEasyPayStore";

const getYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url?.match(regex);
  return match ? match[1] : null;
};
const getYouTubeThumbnail = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

export default function ThemeContent() {
  const selectedTheme = useSelectedTheme();          // ✅ re-renders on change
  const openEasyPay = useEasyPayStore((s) => s.open);
  const [showVideo, setShowVideo] = useState(false);

  // Reset poster → iframe when theme changes
  useEffect(() => setShowVideo(false), [selectedTheme?.key]);

  const videoId = useMemo(
    () => (selectedTheme?.yt_video ? getYouTubeVideoId(selectedTheme.yt_video) : null),
    [selectedTheme?.yt_video]
  );

  if (!selectedTheme) {
    return (
      <section className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.empty}>
            <BookOpen className={styles.emptyIcon} />
            <p>Изберете тема от лявото меню</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrap}>
      <div className={styles.headerCard}>
        <h1 className={styles.title}>
          Платформа 3-5 кл
          <span className={styles.underline} />
        </h1>
      </div>

      <div className={styles.card}>
        <div className={styles.contentStack}>
          <div>
            {/* ✅ Title & description update automatically */}
            <h2 className={styles.themeHeading}>{selectedTheme.title}</h2>
            <p className={styles.desc}>{selectedTheme.description}</p>
          </div>

          {/* ✅ Video section toggles based on whether theme has a video */}
          {videoId ? (
            <div>
              <h3 className={styles.videoTitle}>
                <Video className={styles.videoIcon} />
                Видео урок
              </h3>

              {!showVideo ? (
                <div
                  className={styles.poster}
                  onClick={() => setShowVideo(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setShowVideo(true)}
                >
                  <img
                    src={getYouTubeThumbnail(videoId)}
                    alt={`Видео за ${selectedTheme.title}`}
                    className={styles.posterImg}
                    onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                  />
                  <div className={styles.posterOverlay}>
                    <span className={styles.playCircle}>
                      <Play className={styles.playIcon} />
                    </span>
                  </div>
                </div>
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

              <div className={styles.ctaRow}>
                <button className={styles.primaryBtn} onClick={openEasyPay}>
                  <Smartphone className={styles.btnIcon} />
                  Абонамент с ИзиПей
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.ctaRow}>
              <button className={styles.primaryBtn} onClick={openEasyPay}>
                <Smartphone className={styles.btnIcon} />
                Абонамент с ИзиПей
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
