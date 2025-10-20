"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      const prev = history.scrollRestoration;
      history.scrollRestoration = "manual";
      return () => {
        history.scrollRestoration = prev || "auto";
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hash) return;

    const scrollNow = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const main = document.querySelector("main");
      if (main && main.scrollHeight > main.clientHeight) {
        main.scrollTo({ top: 0, left: 0 });
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollNow);
    });
  }, [pathname, searchParams?.toString()]);

  return null;
}
