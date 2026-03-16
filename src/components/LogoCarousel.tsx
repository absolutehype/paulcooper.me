"use client";

import Image from "next/image";

const logos = [
  { src: "/images/google.svg",  alt: "Google",           width: 111, height: 35 },
  { src: "/images/barclays.svg",alt: "Barclays",          width: 138, height: 23 },
  { src: "/images/tesco.svg",   alt: "Tesco",             width: 122, height: 35 },
  { src: "/images/cruk.svg",    alt: "Cancer Research UK",width: 124, height: 35 },
  { src: "/images/att.svg",     alt: "AT&T",              width:  85, height: 35 },
  { src: "/images/youtube.svg", alt: "YouTube",           width:  84, height: 35 },
  { src: "/images/hp.svg",      alt: "HP Inc",            width:  55, height: 55 },
  { src: "/images/redbull.svg", alt: "Red Bull",          width: 138, height: 32 },
];

export function LogoCarousel() {
  // Duplicate for a seamless loop: animate translateX(-50%) = exactly one set width
  const track = [...logos, ...logos];

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <ul className="logo-marquee flex items-center">
        {track.map((logo, i) => {
          const isDuplicate = i >= logos.length;
          return (
            <li
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: 168, padding: "0 28px" }}
              aria-hidden={isDuplicate ? "true" : undefined}
            >
              <Image
                src={logo.src}
                alt={isDuplicate ? "" : logo.alt}
                width={logo.width}
                height={logo.height}
                className="dark:filter dark:saturate-0 dark:brightness-[100] transition max-w-full h-auto"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
