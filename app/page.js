'use client'

import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/home/hero/Hero";
import ProductsSection from "@/components/home/products/ProductsSection";

export default function Home() {
  return (
    <main className="">
      <Navbar/>
      <Hero/> 
      <ProductsSection/>
    </main>
  );
}