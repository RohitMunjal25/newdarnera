import React from "react";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#e7ddcf] flex justify-center overflow-hidden">
      <video
        src="/hero-main.mp4" 
        autoPlay
        loop
        muted
        playsInline
        // w-full aur aspect-video se frame bilkul nahi kategi aur original shape me rahegi
        className="block w-full aspect-video object-contain md:h-auto max-w-[1920px]"
      />
    </section>
  );
}