"use client";

import TarotCard from "./TarotCard";
import { Reading } from "../services/history/types";

type Props = {
  reading: Reading;
  onClose: () => void;
};

export default function ReadingViewer({ reading, onClose }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1100px",
          background: "rgba(20,20,20,0.95)",
          borderRadius: "12px",
          padding: "20px",
          color: "white",
        }}
      >
        <button
          onClick={onClose}
          style={{
            float: "right",
            background: "transparent",
            color: "white",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2 style={{ textAlign: "center" }}>
          Tiragem Salva
        </h2>

        <p style={{ textAlign: "center", opacity: 0.6 }}>
          {new Date(reading.date).toLocaleString()}
        </p>

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Tipo: {reading.spreadType}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          {reading.cards.map((card, i) => (
            <TarotCard key={i} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}