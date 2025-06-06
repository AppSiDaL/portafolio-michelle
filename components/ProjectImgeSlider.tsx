"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ProjectImgeSlider({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  // Agregar este componente antes de la función principal CreativePortfolio
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambiar imagen cada 3 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative h-64">
      {images.map((img, imgIndex) => (
        <Image
          key={imgIndex}
          src={img}
          alt={`${title} - ${imgIndex + 1}`}
          width={400}
          height={300}
          className={`absolute inset-0 w-full h-64 object-cover transition-opacity duration-500 ${
            imgIndex === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Controles del slider */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 hover:bg-white/90 rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Imagen anterior"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 hover:bg-white/90 rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Siguiente imagen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicadores de posición */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => setCurrentImageIndex(dotIndex)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              dotIndex === currentImageIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Ver imagen ${dotIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
