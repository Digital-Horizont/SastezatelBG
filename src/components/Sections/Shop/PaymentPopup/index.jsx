"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useShopStore } from "@/stores/Shop/useShopStore";
import styles from "./PaymentPopup.module.css";

export default function PaymentPopup() {
  const {
    isPaymentPopupOpen,
    paymentMethod,
    closePaymentPopup,
    selectedProduct,
  } = useShopStore();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isPaymentPopupOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPaymentPopupOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      alert("Моля, приемете политиката за поверителност и общите условия");
      return;
    }

    if (paymentMethod === "easypay") {
      if (!selectedProduct?.key) {
        alert("Липсва ключ на избраната книга. Моля, изберете продукт отново.");
        return;
      }
      if (!email) {
        alert("Моля, въведете имейл.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (paymentMethod === "easypay") {
        const payload = {
          payment_type: "book",
          key: selectedProduct.key,
          product_name: selectedProduct.book_name,
          email,
          phone,
          description: additionalInfo
        };

        console.log("➡️ Easypay register payload:", payload);

        const response = await axios.post("/api/easypay/register", payload, {
          headers: { "Content-Type": "application/json" },
        });

        const data = response.data;

        console.log("✅ Easypay IDN:", data.idn);
        console.log("✅ Easypay Expiration Time:", data.expTime);
      }

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
    } catch (error) {
      alert(error.response?.data?.error || "Възникна грешка при заявката. Моля, опитайте отново.");
    } finally {
      setIsSubmitting(false);
    }
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

        <button
          className={styles.close}
          onClick={closePaymentPopup}
          aria-label="Затвори"
          disabled={isSubmitting}
        >
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
                <strong>⚠️ Важно:</strong> При превода задължително напишете в основанието
                вашия имейл и телефонен номер!
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              <p className={styles.hint}>
                Можете да получите поръчката си само до офиси на Еконт, Спиди или от нашата школа —{" "}
                <a
                  href="https://sicademy.bg"
                  target="_blank"
                  className={styles.link}
                  rel="noreferrer"
                >
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
                disabled={isSubmitting}
              />
              <label htmlFor="terms" className={styles.checkboxLabel}>
                Съгласявам се с{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className={styles.link}
                  rel="noreferrer"
                >
                  политиката за поверителност
                </a>{" "}
                и{" "}
                <a
                  href="/terms-of-services"
                  target="_blank"
                  className={styles.link}
                  rel="noreferrer"
                >
                  общите условия
                </a>{" "}
                *
              </label>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? "Изпращане..." : "Изпрати поръчка"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
