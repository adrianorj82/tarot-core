"use client";

import { useEffect, useState } from "react";

import type { CardType } from "../services/tarotEngine";

type Props = {
  card: CardType;
  width?: number;
  height?: number;
  onReveal?: () => void;
};

export default function TarotCard({
  card,
  width = 220,
  height = 380,
  onReveal,
}: Props) {
  const [isRevealed, setIsRevealed] =
    useState(card.revealed);

  useEffect(() => {
    setIsRevealed(card.revealed);
  }, [card.revealed]);

  function handleClick() {
    if (isRevealed) return;

    setIsRevealed(true);

    if (onReveal) {
      onReveal();
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        perspective: "1000px",
        cursor: isRevealed
          ? "default"
          : "pointer",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.8s ease",
          transform: isRevealed
            ? "rotateY(180deg)"
            : "rotateY(0deg)",
        }}
      >
        {/* COSTAS */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow:
              "0 0 25px rgba(0,0,0,0.65)",
          }}
        >
          <img
            src="/cards/back.png"
            alt="Carta fechada"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* FRENTE */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "18px",
            overflow: "hidden",
            background: "#111",
            boxShadow:
              "0 0 25px rgba(0,0,0,0.65)",
          }}
        >
          <img
            src={card.image}
            alt={card.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: card.reversed
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
          />
        </div>
      </div>
    </div>
  );
}