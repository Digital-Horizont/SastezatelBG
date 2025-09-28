import React, { useState } from "react";
import { X, Smartphone, Mail, Check } from "lucide-react";
import styles from "./EasyPayModal.module.css";
import { useEasyPayStore } from "@/stores/Platform/useEasyPayStore";

export default function EasyPayModal() {
  const isOpen = useEasyPayStore((s) => s.isOpen);
  const close = useEasyPayStore((s) => s.close);

  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !agreed) return;
    console.log("EasyPay subscription request:", { email });
    alert("Кодът за плащане ще бъде изпратен на вашия имейл!");
    setEmail("");
    setAgreed(false);
    close();
  };

  return (
    <div className={styles.mask}>
      <div className={styles.card} role="dialog" aria-modal="true" aria-label="Абонамент с ИзиПей">
        <button className={styles.close} onClick={close} aria-label="Затвори">
          <X className={styles.closeIcon} />
        </button>

        <div className={styles.header}>
          <div className={styles.logoCircle}>
            <Smartphone className={styles.logoIcon} />
          </div>
          <h3 className={styles.title}>Абонамент с ИзиПей</h3>
          <p className={styles.subtitle}>Въведете вашия имейл за да получите код за плащане</p>
        </div>

        <form onSubmit={onSubmit} className={styles.form}>
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
              <a href="/privacy-policy" className={styles.link}>политиката за поверителност</a>
            </label>
          </div>

          <button type="submit" disabled={!email || !agreed} className={styles.submit}>
            <Check className={styles.submitIcon} />
            Изпрати код за плащане
          </button>
        </form>
      </div>
    </div>
  );
}
