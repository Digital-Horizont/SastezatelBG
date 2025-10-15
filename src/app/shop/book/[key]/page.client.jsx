"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useShopStore } from "@/stores/Shop/useShopStore";

import ProductDetail from "@/components/Sections/Shop/ProductDetail";
import BackLink from "@/components/Sections/Shop/BackLink";
import ProductGallery from "@/components/Sections/Shop/ProductGallery";
import ProductInfo from "@/components/Sections/Shop/ProductInfo";
import ProductActions from "@/components/Sections/Shop/ProductActions";

function FromAwareBackLink({ fallbackType = "books" }) {
  const sp = useSearchParams();
  const from = sp?.get("from");
  const type = from === "merch" ? "merch" : from === "books" ? "books" : fallbackType;
  return <BackLink type={type} />;
}

export default function BookDetailClientPage({ product }) {
  const { openPaymentPopup, setSelectedProduct } = useShopStore();

  const view = useMemo(
    () => ({
      name: product.book_name,
      img: product.book_img,
      description: product.book_description,
      price: product.book_price_in_euro,
      key: product.key
    }),
    [product]
  );

  useEffect(() => {
    setSelectedProduct(product);
  }, [product, setSelectedProduct]);

  return (
    <ProductDetail
      backSlot={
        <Suspense fallback={<BackLink type="books" />}>
          <FromAwareBackLink fallbackType="books" />
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
