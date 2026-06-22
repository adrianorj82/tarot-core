"use client";

import { useState } from "react";

import SpreadSelector from "./SpreadSelector";
import CelticCrossSpread from "./spreads/CelticCrossSpread";
import ThreeCardSpread from "./spreads/ThreeCardSpread";
import AstrologicalWheelSpread from "./spreads/AstrologicalWheelSpread";
import FreeSpread from "./spreads/FreeSpread";
import HistoryPanel from "./HistoryPanel";
import Menu from "./Menu";

import allCards from "../allCards.json";

import { drawCards } from "../services/tarotEngine";
import type { CardType } from "../services/tarotEngine";

type SpreadType =
  | "three"
  | "celtic"
  | "astrological"
  | "free";

type ViewType =
  | "new"
  | "history"
  | "favorites"
  | "archived"
  | "profiles"
  | "journal"
  | "settings";

export default function TarotTable() {
  const [spreadType, setSpreadType] = useState<SpreadType>("three");

  const [drawnCards, setDrawnCards] = useState<CardType[]>([]);
  const [bottomCard, setBottomCard] = useState<CardType | null>(null);

  const [isShuffling, setIsShuffling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>("new");

  function revealCard(index: number) {
    setDrawnCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, revealed: true } : card
      )
    );
  }

  function revealBottomCard() {
    setBottomCard((prev) =>
      prev ? { ...prev, revealed: true } : prev
    );
  }

  async function handleDrawCards() {
    if (isShuffling) return;

    setIsShuffling(true);

    await new Promise((r) => setTimeout(r, 1800));

    const result = drawCards(
      allCards as CardType[],
      spreadType
    );

    const cards = result.cards;
    const bottom = result.bottomCard;

    const normalized =
      spreadType === "celtic"
        ? cards.slice(0, 10)
        : cards;

    const hiddenCards = normalized.map((card, index) => ({
      ...card,
      revealed:
        spreadType === "celtic" && index === 0,
    }));

    setDrawnCards(hiddenCards);

    setBottomCard(
      bottom
        ? { ...bottom, revealed: false }
        : null
    );

    const existing = localStorage.getItem("tarot-history");

    const parsed = existing ? JSON.parse(existing) : [];

    const newReading = {
      id: crypto.randomUUID(),
      date: Date.now(),
      spreadType,
      cards: hiddenCards,
      bottomCard: bottom ? { ...bottom, revealed: false } : null,
      favorite: false,
      archived: false,
      profileId: null,
    };

    localStorage.setItem(
      "tarot-history",
      JSON.stringify([newReading, ...parsed])
    );

    setIsShuffling(false);
  }

  return (
    <>
      <Menu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#050505",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1700px",
            minHeight: "900px",
            borderRadius: "28px",
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(212,175,55,0.08)",
            boxShadow: "0 0 60px rgba(0,0,0,0.7)",
            padding: "40px",
            backdropFilter: "blur(4px)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                background: "transparent",
                border: "none",
                color: "#d4af37",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              ☰ Menu
            </button>
          </div>

          {/* TITLE */}
          <h1
            style={{
              textAlign: "center",
              color: "#f5e6b8",
              fontSize: "56px",
              marginBottom: "20px",
            }}
          >
            Escolha sua Tiragem
          </h1>

          {/* SELECTOR */}
          <SpreadSelector
            spreadType={spreadType}
            setSpreadType={setSpreadType}
          />

          {/* DECK */}
          <div style={{ marginTop: "40px" }}>
            <img
              src="/cards/back.png"
              onClick={handleDrawCards}
              style={{
                width: "220px",
                cursor: isShuffling ? "not-allowed" : "pointer",
                opacity: isShuffling ? 0.6 : 1,
              }}
            />
          </div>

          {/* SPREADS */}
          <div style={{ marginTop: "40px" }}>
            {spreadType === "three" && (
              <ThreeCardSpread
                cards={drawnCards}
                onReveal={revealCard}
              />
            )}

            {spreadType === "celtic" && (
              <CelticCrossSpread
                cards={drawnCards.slice(0, 10)}
                onReveal={revealCard}
              />
            )}

            {spreadType === "astrological" && (
              <AstrologicalWheelSpread
                cards={drawnCards.slice(0, 12)}
              />
            )}

            {spreadType === "free" && (
              <FreeSpread cards={drawnCards} />
            )}
          </div>

          {/* FOOTER */}
          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
              color: "#d4af37",
            }}
          >
            Respire e permita que as cartas revelem.
          </div>
        </div>
      </div>

      {currentView === "history" && <HistoryPanel />}
    </>
  );
}