import { create } from "zustand";

export const useShopStore = create((set, get) => ({
  isPaymentPopupOpen: false,
  paymentMethod: null,
  selectedProduct: null,
  selectedProductKey: null,

  openPaymentPopup: (method) => {
    const currentProduct = get().selectedProduct;
    set({
      isPaymentPopupOpen: true,
      paymentMethod: method,
      selectedProductKey: currentProduct ? currentProduct.key : null,
    });
  },

  closePaymentPopup: () =>
    set({
      isPaymentPopupOpen: false,
      paymentMethod: null,
      selectedProductKey: null,
    }),

  setSelectedProduct: (product) =>
    set({
      selectedProduct: product,
    }),
}));
