"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  X,
  Loader2,
  CheckCircle2,
  XCircle,
  Smartphone,
  Mail,
  Phone,
  ChevronDown,
} from "lucide-react";
import styles from "./BankModal.module.css";
import { useBankStore } from "@/stores/Platform/useBankStore";
import { EUR_TO_BGN } from "@/constants/common";

export default function BankModal({ price, platform_key, platform_name }) {
  const isOpen = useBankStore((s) => s.isOpen);
  const close = useBankStore((s) => s.close);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [months, setMonths] = useState(1);

  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({ contact: false, terms: false });

  const { totalPriceInEur, totalPriceInLeva } = useMemo(() => {
    const eur = price * Number(months || 0);
    const bgn = eur * EUR_TO_BGN;
    return { totalPriceInEur: eur, totalPriceInLeva: bgn };
  }, [months, price]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const resetLocalState = () => {
    setPhone("");
    setEmail("");
    setAdditionalInfo("");
    setAgreedToTerms(false);
    setMonths(1);
    setSubmitStatus("idle");
    setErrorMessage("");
    setErrors({ contact: false, terms: false });
  };

  const handleClose = () => {
    resetLocalState();
    close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { contact: !email, terms: !agreedToTerms };
    setErrors(newErrors);
    if (newErrors.contact || newErrors.terms) return;

    setSubmitStatus("loading");
    try {
      const payload = {
        payment_type: platform_key,
        product_name: platform_name,
        email,
        phone,
        description: additionalInfo,
        agreed: agreedToTerms,
        quantity: months,
      };

      await axios.post("/api/bank", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error?.response?.data?.error ||
          "Възникна грешка при заявката. Моля, опитайте отново."
      );
    }
  };

  if (!isOpen) return null;

  if (submitStatus === "loading") {
    return (
      <div className={styles.mask}>
        <div
          className={styles.card}
          role="dialog"
          aria-modal="true"
          aria-label="Обработка на заявка"
        >
          <div className={styles.bubble1} />
          <div className={styles.bubble2} />
          <div className={styles.bubble3} />

          <div className={styles.statusContent}>
            <Loader2 className={styles.spinnerIcon} />
            <h2 className={styles.statusTitle}>Обработка на заявката...</h2>
            <p className={styles.statusText}>
              Моля, изчакайте докато обработим вашата заявка.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (submitStatus === "success") {
    return (
      <div className={styles.mask} onClick={handleClose}>
        <div
          className={styles.card}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Успешна заявка"
        >
          <div className={styles.bubble1} />
          <div className={styles.bubble2} />
          <div className={styles.bubble3} />

          <button
            className={styles.close}
            onClick={handleClose}
            aria-label="Затвори"
          >
            <X className={styles.closeIcon} />
          </button>

          <div className={styles.statusContent}>
            <CheckCircle2 className={styles.successIcon} />
            <h2 className={styles.statusTitle}>Успешно изпратена заявка!</h2>
            <p className={styles.statusText}>
              Благодарим Ви! На посочения имейл ще получите информацията за
              плащане с банка.
            </p>
            <button onClick={handleClose} className={styles.statusBtn}>
              Затвори
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submitStatus === "error") {
    return (
      <div className={styles.mask} onClick={handleClose}>
        <div
          className={styles.card}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Грешка при заявка"
        >
          <div className={styles.bubble1} />
          <div className={styles.bubble2} />
          <div className={styles.bubble3} />

          <button
            className={styles.close}
            onClick={handleClose}
            aria-label="Затвори"
          >
            <X className={styles.closeIcon} />
          </button>

          <div className={styles.statusContent}>
            <XCircle className={styles.errorIcon} />
            <h2 className={styles.statusTitle}>Възникна грешка</h2>
            <p className={styles.statusText}>{errorMessage}</p>
            <div className={styles.errorActions}>
              <button
                onClick={() => setSubmitStatus("idle")}
                className={styles.statusBtn}
              >
                Опитай отново
              </button>
              <button onClick={handleClose} className={styles.statusBtn}>
                Затвори
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mask} onClick={handleClose}>
      <div
        className={styles.card}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Абонамент с Банка"
      >
        <div className={styles.bubble1} />
        <div className={styles.bubble2} />
        <div className={styles.bubble3} />

        <button
          className={styles.close}
          onClick={handleClose}
          aria-label="Затвори"
        >
          <X className={styles.closeIcon} />
        </button>

        <div className={styles.scrollArea}>
          <div className={styles.content}>
            <div className={styles.logoCircle} aria-hidden="true">
              <Smartphone className={styles.logoIcon} />
            </div>
            <h2 className={styles.title}>Абонамент с Банка</h2>

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

            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.field}>
                <label htmlFor="phone" className={styles.label}>
                  Телефонен номер (по избор)
                </label>
                <div className={styles.inputWrap}>
                  <Phone className={styles.inputIcon} />
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={styles.input}
                    placeholder="+359 ..."
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Имейл *
                </label>
                <div className={styles.inputWrap}>
                  <Mail className={styles.inputIcon} />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.contact)
                        setErrors((p) => ({ ...p, contact: false }));
                    }}
                    className={`${styles.input} ${
                      errors.contact ? styles.inputError : ""
                    }`}
                    placeholder="example@email.com"
                    inputMode="email"
                    autoComplete="email"
                  />
                </div>
                {errors.contact && (
                  <p className={styles.errorText}>* Моля, въведете имейл.</p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="months" className={styles.label}>
                  Срок на абонамента
                </label>

                <div className={styles.monthsRow}>
                  <div className={styles.selectWrap}>
                    <select
                      id="months"
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className={styles.select}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>
                          {m} {m === 1 ? "месец" : "месеца"}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className={styles.selectChevron}
                      aria-hidden="true"
                    />
                  </div>

                  <div className={styles.priceContainer}>
                    <p className={styles.priceBgn}>
                      {totalPriceInLeva.toFixed(2)} лв
                    </p>
                    <p className={styles.priceEur}>
                      (&#8364;{totalPriceInEur.toFixed(2)})
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="additionalInfo" className={styles.label}>
                  Допълнителна информация (по избор)
                </label>
                <textarea
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className={styles.textarea}
                  placeholder="Ако имате бележки към заявката, добавете ги тук."
                  rows={4}
                />
              </div>

              <div className={styles.checkboxField}>
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (errors.terms)
                      setErrors((p) => ({ ...p, terms: false }));
                  }}
                  className={`${styles.checkbox} ${
                    errors.terms ? styles.checkboxError : ""
                  }`}
                  required
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
              {errors.terms && (
                <p className={styles.errorText}>
                  * Моля, приемете политиката за поверителност и общите условия.
                </p>
              )}

              <button type="submit" className={styles.submitBtn}>
                Изпрати заявка
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
