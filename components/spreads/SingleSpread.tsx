"use client";

import TarotCard from "../TarotCard";

import type { CardType } from "../../services/tarotEngine";

type Props = {
  cards: CardType[];
};

export default function SingleSpread({
  cards,
}: Props) {
  if (cards.length === 0) {
    return null;
  }

  const card = cards[0];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* LABEL */}
        <div
          style={{
            color: "#d4af37",
            fontSize: "18px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            textShadow:
              "0 0 10px rgba(212,175,55,0.2)",
          }}
        >
          Your Card
        </div>

        {/* CARD */}
        <TarotCard card={card} />

        {/* NAME */}
        {card.revealed && (
          <div
            style={{
              color: "#f1e7c9",
              fontSize: "24px",
              letterSpacing: "1px",
              textAlign: "center",
              textShadow:
                "0 0 12px rgba(0,0,0,0.7)",
            }}
          >
            {card.name}

            {card.reversed &&
              " • Reversed"}
          </div>
        )}
      </div>
    </div>
  );
}