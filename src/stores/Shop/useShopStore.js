import { create } from "zustand";

export const useShopStore = create((set) => ({
  isPaymentPopupOpen: false,
  paymentMethod: null,
  selectedProduct: null,

  openPaymentPopup: (method) =>
    set({ isPaymentPopupOpen: true, paymentMethod: method }),
  closePaymentPopup: () =>
    set({ isPaymentPopupOpen: false, paymentMethod: null }),

  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));
