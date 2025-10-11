"use client";

import { CreditCard, Building2 } from "lucide-react";
import styles from "./ProductActions.module.css";

export default function ProductActions({ onPayEasyPay, onPayBank }) {
  return (
    <div className={styles.row}>
      <button className={styles.btn} onClick={onPayEasyPay}>
        <CreditCard className={styles.icon} />
        Плати с Изипей
      </button>
      <button className={styles.btn} onClick={onPayBank}>
        <Building2 className={styles.icon} />
        Плати по банков път
      </button>
    </div>
  );
}
