"use client";

import TarotCard from "../TarotCard";
import type { CardType } from "../../services/tarotEngine";

type Props = {
  cards: CardType[];
  onReveal: (index: number) => void;
};

export default function ThreeCardSpread({
  cards,
  onReveal,
}: Props) {
  const positions = ["PASSADO", "PRESENTE", "FUTURO"];

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 768;

  const CARD_W = isMobile ? 70 : 90;
  const CARD_H = isMobile ? 120 : 150;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* LABEL */}
          <div
            style={{
              color: "#d4af37",
              fontSize: "16px",
              letterSpacing: "2px",
            }}
          >
            {positions[index]}
          </div>

          {/* CARTA (CORRIGIDA) */}
          <TarotCard
            card={card}
            width={90}
            height={150}
            onReveal={() => onReveal(index)}
          />

          {/* NOME */}
          {card.revealed && (
            <div
              style={{
                color: "#f1e7c9",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              {card.name}
              {card.reversed && " • Invertida"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}