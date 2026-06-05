"use client";

import { useState } from "react";
import TarotCard from "../TarotCard";
import type { CardType } from "../../services/tarotEngine";

type FreeTableCard = CardType & {
  id: string;
  x: number;
  y: number;
};

interface FreeSpreadProps {
  drawCard: () => CardType | null;
}

export default function FreeSpread({
  drawCard,
}: FreeSpreadProps) {
  const [placedCards, setPlacedCards] =
    useState<FreeTableCard[]>([]);

  const [currentCard, setCurrentCard] =
    useState<FreeTableCard | null>(null);

  const [mousePos, setMousePos] =
    useState({ x: 0, y: 0 });

  const [readingStarted, setReadingStarted] =
    useState(false);

  function handleDrawCard() {
    if (readingStarted) return;

    if (currentCard) return;

    const card = drawCard();

    if (!card) return;

    setCurrentCard({
      ...card,
      id: crypto.randomUUID(),
      revealed: false,
      x: 0,
      y: 0,
    });
  }

  function placeCard(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    if (readingStarted) return;

    if (!currentCard) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = 600;
    const centerY = 600;

    const radius = 430;

    const dx = x - centerX;
    const dy = y - centerY;

    const distance = Math.sqrt(
      dx * dx + dy * dy
    );

    if (distance > radius) {
      return;
    }

    setPlacedCards((prev) => [
      ...prev,
      {
        ...currentCard,
        x: x - 55,
        y: y - 90,
      },
    ]);

    setCurrentCard(null);
  }

  function revealCard(id: string) {
    if (!readingStarted) return;

    setPlacedCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? {
              ...card,
              revealed: true,
            }
          : card
      )
    );
  }

  function startReading() {
    if (placedCards.length === 0) return;

    setReadingStarted(true);
    setCurrentCard(null);
  }

  return (
    <div
      style={{
        width: "100%",
        background: "#000",
        paddingBottom: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={handleDrawCard}
          disabled={
            readingStarted ||
            currentCard !== null
          }
        >
          Comprar Carta
        </button>

        <button
          onClick={startReading}
          disabled={
            readingStarted ||
            placedCards.length === 0
          }
        >
          Iniciar Leitura
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",

            width: "1200px",
            height: "1200px",

            overflow: "hidden",

            backgroundImage:
              "url('/backgrounds/free-table.png')",

            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          onMouseMove={(e) => {
            const rect =
              e.currentTarget.getBoundingClientRect();

            setMousePos({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
          }}
          onClick={placeCard}
        >
          {placedCards.map((card) => (
            <div
              key={card.id}
              style={{
                position: "absolute",
                left: card.x,
                top: card.y,
              }}
            >
              <TarotCard
                card={card}
                width={110}
                height={180}
                onReveal={() =>
                  revealCard(card.id)
                }
              />
            </div>
          ))}

          {!readingStarted &&
            currentCard && (
              <div
                style={{
                  position: "absolute",
                  left: mousePos.x - 55,
                  top: mousePos.y - 240,

                  pointerEvents: "none",

                  opacity: 0.9,
                }}
              >
                <TarotCard
                  card={currentCard}
                  width={110}
                  height={180}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}