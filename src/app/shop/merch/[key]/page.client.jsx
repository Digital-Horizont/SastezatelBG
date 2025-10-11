"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useShopStore } from "@/stores/Shop/useShopStore";

import ProductDetail from "@/components/Sections/Shop/ProductDetail";
import BackLink from "@/components/Sections/Shop/BackLink";
import ProductGallery from "@/components/Sections/Shop/ProductGallery";
import ProductInfo from "@/components/Sections/Shop/ProductInfo";
import ProductActions from "@/components/Sections/Shop/ProductActions";

export default function MerchDetailClientPage({ product }) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const { openPaymentPopup, setSelectedProduct } = useShopStore();
  const view = useMemo(() => ({
    type: "merch",
    name: product.merch_name,
    img: product.merch_img,
    description: product.merch_description,
    price: product.merch_price_in_euro,
  }), [product]);

  useEffect(() => {
    setSelectedProduct(product);
  }, [product, setSelectedProduct]);

  return (
    <ProductDetail
      backSlot={<BackLink type={from === "books" ? "books" : "merch"} />}
      gallerySlot={<ProductGallery src={view.img} alt={view.name} />}
      infoSlot={<ProductInfo title={view.name} description={view.description} price={view.price} />}
      actionsSlot={
        <ProductActions
          onPayEasyPay={() => openPaymentPopup("easypay")}
          onPayBank={() => openPaymentPopup("bank")}
        />
      }
    />
  );
}
