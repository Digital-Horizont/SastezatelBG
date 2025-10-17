import { create } from "zustand";

export const useShopStore = create((set, get) => ({
  isPaymentPopupOpen: false,
  paymentMethod: null,
  selectedProduct: null,
  selectedProductKey: null,
  quantity: 1,

  setQuantity: (q) => set({ quantity: q }),
  incrementQuantity: () =>
    set((state) => {
      const current = Number.parseInt(state.quantity, 10);
      const safe = Number.isFinite(current) && current >= 1 ? current : 1;
      return { quantity: safe + 1 };
    }),
  decrementQuantity: () =>
    set((state) => {
      const current = Number.parseInt(state.quantity, 10);
      const safe = Number.isFinite(current) && current > 1 ? current - 1 : 1;
      return { quantity: safe };
    }),

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
