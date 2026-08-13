"use client";

// Sirf wahi components import kiye hain jo tujhe website par turant dikhane hain
import FeaturedCollection from "@/components/FeaturedCollection";
import CollectionFallback from "@/components/CollectionFallback";
import DiscoveryPackFallback from "@/components/DiscoveryPackFallback";
import AnimatedReviews from "@/components/AnimatedReviews";

export default function HomeSectionsGate() {
  // Yahan se saara API fetching aur loading logic uda diya hai taaki koi flash na ho.
  // Watch & Buy aur Instagram ko bhi hata diya hai.
  
  return (
    <>
      <FeaturedCollection />
      <CollectionFallback />
      <DiscoveryPackFallback />
      <AnimatedReviews />
    </>
  );
}