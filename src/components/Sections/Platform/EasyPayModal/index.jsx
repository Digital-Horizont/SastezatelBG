import React, { useState, useEffect } from "react";
import { X, Smartphone, Mail, Check, Phone } from "lucide-react";
import styles from "./EasyPayModal.module.css";
import { useEasyPayStore } from "@/stores/Platform/useEasyPayStore";

export default function EasyPayModal() {
  const isOpen = useEasyPayStore((s) => s.isOpen);
  const close = useEasyPayStore((s) => s.close);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !phone || !agreed) return;

    console.log("EasyPay subscription request:", { email, phone });
    alert("Кодът за плащане ще бъде изпратен на вашия имейл и телефон!");
    setEmail("");
    setPhone("");
    setAgreed(false);
    close();
  };

  return (
    <div className={styles.mask}>
      <div
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-label="Абонамент с ИзиПей"
      >
        <button className={styles.close} onClick={close} aria-label="Затвори">
          <X className={styles.closeIcon} />
        </button>

        <div className={styles.header}>
          <div className={styles.logoCircle}>
            <Smartphone className={styles.logoIcon} />
          </div>
          <h3 className={styles.title}>Абонамент с ИзиПей</h3>
          <p className={styles.subtitle}>
            Въведете вашия имейл и телефон, за да получите код за плащане
          </p>
        </div>

        <form onSubmit={onSubmit} className={styles.form}>
          {/* Email field */}
          <label className={styles.label}>Имейл адрес</label>
          <div className={styles.inputWrap}>
            <Mail className={styles.inputIcon} />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="your@email.com"
            />
          </div>

          {/* Phone field */}
          <label className={styles.label}>Телефонен номер</label>
          <div className={styles.inputWrap}>
            <Phone className={styles.inputIcon} />
            <input
              required
              type="tel"
              pattern="^[0-9+\s()-]{7,20}$"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
              placeholder="+359 88 123 4567"
            />
          </div>

          <div className={styles.checkboxRow}>
            <input
              id="privacy"
              type="checkbox"
              className={styles.checkbox}
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />
            <label htmlFor="privacy" className={styles.checkboxLabel}>
              Съгласявам се с{" "}
              <a href="/privacy-policy" className={styles.link}>
                политиката за поверителност
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={!email || !phone || !agreed}
            className={styles.submit}
          >
            <Check className={styles.submitIcon} />
            Изпрати код за плащане
          </button>
        </form>
      </div>
    </div>
  );
}
