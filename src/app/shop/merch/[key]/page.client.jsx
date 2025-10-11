"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useShopStore } from "@/stores/Shop/useShopStore";

import ProductDetail from "@/components/Sections/Shop/ProductDetail";
import BackLink from "@/components/Sections/Shop/BackLink";
import ProductGallery from "@/components/Sections/Shop/ProductGallery";
import ProductInfo from "@/components/Sections/Shop/ProductInfo";
import ProductActions from "@/components/Sections/Shop/ProductActions";

function FromAwareBackLink({ fallbackType = "merch" }) {
  const sp = useSearchParams();
  const from = sp?.get("from");
  const type = from === "books" ? "books" : from === "merch" ? "merch" : fallbackType;
  return <BackLink type={type} />;
}

export default function MerchDetailClientPage({ product }) {
  const { openPaymentPopup, setSelectedProduct } = useShopStore();

  const view = useMemo(
    () => ({
      name: product.merch_name,
      img: product.merch_img,
      description: product.merch_description,
      price: product.merch_price_in_euro,
    }),
    [product]
  );

  useEffect(() => {
    setSelectedProduct(product);
  }, [product, setSelectedProduct]);

  return (
    <ProductDetail
      backSlot={
        <Suspense fallback={<BackLink type="merch" />}>
          <FromAwareBackLink fallbackType="merch" />
        </Suspense>
      }
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
