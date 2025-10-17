"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { X, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { useShopStore } from "@/stores/Shop/useShopStore"
import styles from "./PaymentPopup.module.css"

export default function PaymentPopup() {
  const { isPaymentPopupOpen, paymentMethod, closePaymentPopup, selectedProduct } = useShopStore()

  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle") // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("")
  const [errors, setErrors] = useState({
    contact: false,
    terms: false,
    additionalInfo: false,
  })

  useEffect(() => {
    document.body.style.overflow = isPaymentPopupOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isPaymentPopupOpen])

  const handleClose = () => {
    setPhone("")
    setEmail("")
    setAdditionalInfo("")
    setAgreedToTerms(false)
    setSubmitStatus("idle")
    setErrorMessage("")
    setErrors({
      contact: false,
      terms: false,
      additionalInfo: false,
    })
    closePaymentPopup()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {
      contact: !email,
      terms: !agreedToTerms,
      additionalInfo: !additionalInfo.trim(),
    }

    setErrors(newErrors)

    if (newErrors.contact || newErrors.terms || newErrors.additionalInfo) {
      return
    }

    if (!selectedProduct?.key) {
      alert("Липсва ключ на избраната книга. Моля, изберете продукт отново.")
      return
    }

    setSubmitStatus("loading")

    try {
      const payload = {
        payment_type: "book",
        key: selectedProduct.key,
        product_name: selectedProduct.book_name,
        email,
        phone,
        description: additionalInfo,
        agreed: agreedToTerms,
      }

      const endpoint = paymentMethod === "easypay" ? "/api/easypay/register" : "/api/bank"

      console.log("➡️ Register payload:", payload, "➡️ Endpoint:", endpoint)

      const response = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      })

      const data = response.data

      if (paymentMethod === "easypay") {
        console.log("✅ Easypay IDN:", data.idn)
        console.log("✅ Easypay Expiration Time:", data.expTime)
      } else {
        console.log("✅ Bank order created:", data)
      }

      setSubmitStatus("success")
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error?.response?.data?.error || "Възникна грешка при заявката. Моля, опитайте отново.")
    }
  }

  if (!isPaymentPopupOpen) return null

  if (submitStatus === "loading") {
    return (
      <div className={styles.mask}>
        <div className={styles.card} role="dialog" aria-modal="true" aria-label="Обработка на поръчка">
          <div className={styles.bubble1} />
          <div className={styles.bubble2} />
          <div className={styles.bubble3} />

          <div className={styles.statusContent}>
            <Loader2 className={styles.spinnerIcon} />
            <h2 className={styles.statusTitle}>Обработка на поръчката...</h2>
            <p className={styles.statusText}>Моля, изчакайте докато обработим вашата заявка.</p>
          </div>
        </div>
      </div>
    )
  }

  if (submitStatus === "success") {
    return (
      <div className={styles.mask} onClick={handleClose}>
        <div
          className={styles.card}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Успешна поръчка"
        >
          <div className={styles.bubble1} />
          <div className={styles.bubble2} />
          <div className={styles.bubble3} />

          <button className={styles.close} onClick={handleClose} aria-label="Затвори">
            <X className={styles.closeIcon} />
          </button>

          <div className={styles.statusContent}>
            <CheckCircle2 className={styles.successIcon} />
            <h2 className={styles.statusTitle}>Успешно направена поръчка!</h2>
            <p className={styles.statusText}>
              Благодарим ви че направихте поръчка при нас, на посоченият имейл ще ви бъде изпратена информацията и
              стъпките за плащане!
            </p>
            <button onClick={handleClose} className={styles.statusBtn}>
              Затвори
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (submitStatus === "error") {
    return (
      <div className={styles.mask} onClick={handleClose}>
        <div
          className={styles.card}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Грешка при поръчка"
        >
          <div className={styles.bubble1} />
          <div className={styles.bubble2} />
          <div className={styles.bubble3} />

          <button className={styles.close} onClick={handleClose} aria-label="Затвори">
            <X className={styles.closeIcon} />
          </button>

          <div className={styles.statusContent}>
            <XCircle className={styles.errorIcon} />
            <h2 className={styles.statusTitle}>Възникна грешка</h2>
            <p className={styles.statusText}>{errorMessage}</p>
            <div className={styles.errorActions}>
              <button onClick={() => setSubmitStatus("idle")} className={styles.statusBtn}>
                Опитай отново
              </button>
              <button onClick={handleClose} className={styles.statusBtnSecondary}>
                Затвори
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.mask} onClick={handleClose}>
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

        <button className={styles.close} onClick={handleClose} aria-label="Затвори">
          <X className={styles.closeIcon} />
        </button>

        <div className={styles.content}>
          <h2 className={styles.title}>{paymentMethod === "easypay" ? "Плащане с Изипей" : "Плащане по Банка"}</h2>

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

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                Телефонен номер
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
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
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.contact) {
                    setErrors((prev) => ({ ...prev, contact: false }))
                  }
                }}
                className={`${styles.input} ${errors.contact ? styles.inputError : ""}`}
                placeholder="example@email.com"
              />
              {errors.contact && <p className={styles.errorText}>* Моля, въведете поне имейл.</p>}
            </div>

            <div className={styles.field}>
              <label htmlFor="additionalInfo" className={styles.label}>
                Допълнителна информация за доставка *
              </label>
              <textarea
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => {
                  setAdditionalInfo(e.target.value)
                  if (errors.additionalInfo) {
                    setErrors((prev) => ({ ...prev, additionalInfo: false }))
                  }
                }}
                className={`${styles.textarea} ${errors.additionalInfo ? styles.inputError : ""}`}
                placeholder="Доставка до офис на Спиди, Еконт или от нашата школа — Сикадеми"
                rows={4}
              />
              <p className={styles.hint}>
                Можете да получите поръчката си само до офиси на Еконт, Спиди или от нашата школа —{" "}
                <a href="https://sicademy.bg" target="_blank" className={styles.link} rel="noreferrer">
                  Сикадеми
                </a>
              </p>
              {errors.additionalInfo && <p className={styles.errorText}>* Моля, въведете информация за доставка.</p>}
            </div>

            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked)
                  if (errors.terms) {
                    setErrors((prev) => ({ ...prev, terms: false }))
                  }
                }}
                required
                className={`${styles.checkbox} ${errors.terms ? styles.checkboxError : ""}`}
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
            {errors.terms && (
              <p className={styles.errorText}>* Моля, приемете политиката за поверителност и общите условия.</p>
            )}

            <button type="submit" className={styles.submitBtn}>
              Изпрати поръчка
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
