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
  const positions = [
    "PASSADO",
    "PRESENTE",
    "FUTURO",
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "48px",
        flexWrap: "wrap",
        width: "100%",
        marginTop: "20px",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* POSIÇÃO */}
          <div
            style={{
              color: "#d4af37",
              fontSize: "18px",
              letterSpacing: "2px",
              fontWeight: 500,
              textShadow:
                "0 0 10px rgba(212,175,55,0.25)",
            }}
          >
            {positions[index]}
          </div>

          {/* CARTA */}
        <TarotCard
  card={card}
  onReveal={() => onReveal(index)}
/>

          {/* NOME */}
          {card.revealed && (
            <div
              style={{
                color: "#f1e7c9",
                fontSize: "20px",
                marginTop: "4px",
                letterSpacing: "1px",
                textAlign: "center",
                textShadow:
                  "0 0 12px rgba(0,0,0,0.7)",
              }}
            >
              {card.name}

              {card.reversed &&
                " • Invertida"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}