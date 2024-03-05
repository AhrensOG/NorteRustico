"use client";

import Hero from "@/components/home/hero/Hero";
import ProductsSection from "@/components/home/products/ProductsSection";
import TopCategoriesSection from "@/components/home/topCategories/TopCategoriesSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <TopCategoriesSection/>
      <ProductsSection />
    </main>
  );
}
