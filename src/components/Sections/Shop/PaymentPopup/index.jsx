"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useShopStore } from "@/stores/Shop/useShopStore";
import styles from "./PaymentPopup.module.css";

export default function PaymentPopup() {
  const { isPaymentPopupOpen, paymentMethod, closePaymentPopup, selectedProduct } = useShopStore();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isPaymentPopupOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPaymentPopupOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      alert("Моля, приемете политиката за поверителност и общите условия");
      return;
    }

    console.log("[v0] Payment submission:", {
      phone,
      email,
      additionalInfo,
      paymentMethod,
      product: selectedProduct,
    });

    alert(
      `Поръчката е изпратена успешно! Метод на плащане: ${
        paymentMethod === "easypay" ? "Изипей" : "Банка"
      }`
    );

    setPhone("");
    setEmail("");
    setAdditionalInfo("");
    setAgreedToTerms(false);
    closePaymentPopup();
  };

  if (!isPaymentPopupOpen) return null;

  return (
    <div className={styles.mask} onClick={closePaymentPopup}>
      <div
        className={styles.card}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Форма за плащане"
      >
        <div className={styles.bubble1} />
        <div className={styles.bubble2} />
        <div className={styles.bubble3} />

        <button className={styles.close} onClick={closePaymentPopup} aria-label="Затвори">
          <X className={styles.closeIcon} />
        </button>

        <div className={styles.content}>
          <h2 className={styles.title}>
            {paymentMethod === "easypay" ? "Плащане с Изипей" : "Плащане по Банка"}
          </h2>

          {paymentMethod === "bank" && (
            <div className={styles.bankDetails}>
              <h3 className={styles.bankDetailsTitle}>Банкови данни за превод:</h3>
              <div className={styles.bankInfo}>
                <div className={styles.bankInfoRow}>
                  <span className={styles.bankLabel}>IBAN:</span>
                  <span className={styles.bankValue}>BG00 XXXX 0000 0000 0000 00</span>
                </div>
                <div className={styles.bankInfoRow}>
                  <span className={styles.bankLabel}>BIC:</span>
                  <span className={styles.bankValue}>XXXXBGSF</span>
                </div>
                <div className={styles.bankInfoRow}>
                  <span className={styles.bankLabel}>Титуляр:</span>
                  <span className={styles.bankValue}>Сикадеми ЕООД</span>
                </div>
              </div>
              <div className={styles.bankWarning}>
                <strong>⚠️ Важно:</strong> При превода задължително напишете в основанието вашия имейл и телефонен номер!
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                Телефонен номер *
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={styles.input}
                placeholder="+359 ..."
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Имейл *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
                placeholder="example@email.com"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="additionalInfo" className={styles.label}>
                Допълнителна информация за доставка
              </label>
              <textarea
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className={styles.textarea}
                placeholder="Доставка до офис на Спиди, Еконт или от нашата школа - Сикадеми"
                rows={4}
              />
              <p className={styles.hint}>
                Можете да получите поръчката си само до офиси на Еконт, Спиди или от нашата школа -{" "}
                <a href="https://sicademy.bg" target="_blank" className={styles.link} rel="noreferrer">
                  Сикадеми
                </a>
              </p>
            </div>

            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
                className={styles.checkbox}
              />
              <label htmlFor="terms" className={styles.checkboxLabel}>
                Съгласявам се с{" "}
                <a href="/privacy-policy" target="_blank" className={styles.link} rel="noreferrer">
                  политиката за поверителност
                </a>{" "}
                и{" "}
                <a href="/terms-of-services" target="_blank" className={styles.link} rel="noreferrer">
                  общите условия
                </a>{" "}
                *
              </label>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Изпрати поръчка
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
