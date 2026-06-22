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
  const [placedCards, setPlacedCards] = useState<FreeTableCard[]>([]);
  const [currentCard, setCurrentCard] = useState<FreeTableCard | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [readingStarted, setReadingStarted] = useState(false);

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 768;

  const CARD_W = isMobile ? 80 : 110;
  const CARD_H = isMobile ? 130 : 180;

  function handleDrawCard() {
    if (readingStarted) return;

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

  function placeCard(e: React.MouseEvent<HTMLDivElement>) {
    if (readingStarted) return;
    if (!currentCard) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPlacedCards((prev) => [
      ...prev,
      {
        ...currentCard,
        x: x - CARD_W / 2,
        y: y - CARD_H / 2,
      },
    ]);

    setCurrentCard(null);
  }

  function revealCard(id: string) {
    if (!readingStarted) return;

    setPlacedCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? { ...card, revealed: true }
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
        background: "#050505",
        paddingBottom: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* BOTÕES */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <button
          onPointerDown={handleDrawCard}
          disabled={readingStarted}
        >
          Comprar Carta
        </button>

        <button
          onClick={startReading}
          disabled={readingStarted || placedCards.length === 0}
        >
          Trancar Leitura
        </button>
      </div>

      {/* MESA RETANGULAR */}
      <div
        style={{
          position: "relative",
          width: "min(95vw, 1100px)",
          height: "700px",

          background: "rgba(0,0,0,0.65)",
          backgroundImage: "url('/backgrounds/free-table.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",

          borderRadius: "12px",
          border: "2px dashed rgba(212,175,55,0.35)",

          boxShadow: "0 0 40px rgba(0,0,0,0.8) inset",
          overflow: "hidden",
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();

          setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onClick={placeCard}
      >
        {/* CARTAS FIXADAS */}
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
              width={CARD_W}
              height={CARD_H}
              onReveal={() => revealCard(card.id)}
            />
          </div>
        ))}

        {/* PREVIEW */}
        {!readingStarted && currentCard && (
          <div
            style={{
              position: "absolute",
              left: mousePos.x - CARD_W / 2,
              top: mousePos.y - CARD_H - 20,
              pointerEvents: "none",
              opacity: 0.85,
            }}
          >
            <TarotCard
              card={currentCard}
              width={CARD_W}
              height={CARD_H}
            />
          </div>
        )}
      </div>
    </div>
  );
}