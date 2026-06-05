"use client";

import TarotCard from "../TarotCard";
import type { CardType } from "../../services/tarotEngine";

type Props = {
  cards: CardType[];
  onReveal: (index: number) => void;
};

export default function CelticCrossSpread({
  cards,
  onReveal,
}: Props) {
  const safeCards = [...cards];

  while (safeCards.length < 10) {
    safeCards.push({
      name: "",
      image: "/cards/back.png",
      revealed: false,
    } as CardType);
  }

  const labels = [
    "Situação Atual",
    "Desafio",
    "Consciente",
    "Inconsciente",
    "Passado",
    "Futuro",
    "Você",
    "Ambiente",
    "Esperanças e Medos",
    "Resultado",
  ];

  function renderCard(
    card: CardType,
    index: number,
    rotate = false
  ) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            transform: rotate
              ? "rotate(90deg)"
              : "none",
          }}
        >
<TarotCard
  card={
    index === 0
      ? { ...card, revealed: true }
      : card
  }
  onReveal={() => onReveal(index)}
/>
        </div>

        {card.revealed && (
          <div
            style={{
              color: "#f1e7c9",
              fontSize: "18px",
              textAlign: "center",
              maxWidth: "220px",
              textShadow:
                "0 0 12px rgba(0,0,0,0.7)",
            }}
          >
            {card.name}
            {card.reversed &&
              " • Invertida"}
          </div>
        )}

        <div
          style={{
            color: "#d4af37",
            fontSize: "14px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          {labels[index]}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "140px",
        flexWrap: "wrap",
        marginTop: "30px",
      }}
    >
      {/* CRUZ CENTRAL */}
      <div
        style={{
          position: "relative",
          width: "900px",
          height: "900px",
        }}
      >
        {/* CENTRO */}
        <div
          style={{
            position: "absolute",
            left: "320px",
            top: "300px",
            zIndex: 1,
          }}
        >
          {renderCard(
            safeCards[0],
            0
          )}
        </div>

        {/* CRUZANDO */}
        <div
          style={{
            position: "absolute",
            left: "320px",
            top: "300px",
            zIndex: 2,
          }}
        >
          {renderCard(
            safeCards[1],
            1,
            true
          )}
        </div>

        {/* TOPO */}
        <div
          style={{
            position: "absolute",
            left: "320px",
            top: "0px",
          }}
        >
          {renderCard(
            safeCards[2],
            2
          )}
        </div>

        {/* BASE */}
        <div
          style={{
            position: "absolute",
            left: "320px",
            top: "600px",
          }}
        >
          {renderCard(
            safeCards[3],
            3
          )}
        </div>

        {/* ESQUERDA */}
        <div
          style={{
            position: "absolute",
            left: "40px",
            top: "300px",
          }}
        >
          {renderCard(
            safeCards[4],
            4
          )}
        </div>

        {/* DIREITA */}
        <div
          style={{
            position: "absolute",
            left: "600px",
            top: "300px",
          }}
        >
          {renderCard(
            safeCards[5],
            5
          )}
        </div>
      </div>

      {/* COLUNA DIREITA */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          marginTop: "40px",
        }}
      >
        {safeCards
          .slice(6, 10)
          .map((card, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <TarotCard
                card={card}
                onReveal={() =>
                  onReveal(index + 6)
                }
              />

              {card.revealed && (
                <div
                  style={{
                    color: "#f1e7c9",
                    fontSize: "18px",
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

              <div
                style={{
                  color: "#d4af37",
                  fontSize: "14px",
                  letterSpacing: "2px",
                  textTransform:
                    "uppercase",
                  opacity: 0.9,
                }}
              >
                {labels[index + 6]}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}