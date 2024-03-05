"use client";

import Hero from "@/components/home/hero/Hero";
import HeroV2 from "@/components/home/hero/HeroV2";
import ProductsSection from "@/components/home/products/ProductsSection";
import TopCategoriesSection from "@/components/home/topCategories/TopCategoriesSection";

export default function Home() {
  return (
    <main>
      <HeroV2 />
      <TopCategoriesSection/>
      <ProductsSection />
    </main>
  );
}
