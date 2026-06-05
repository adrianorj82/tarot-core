"use client";

import { useEffect, useState } from "react";

import TarotCard from "./TarotCard";

import type { CardType } from "../services/tarotEngine";

type ReadingHistory = {
  id: string;

  date: number;

  spreadType: string;

  cards: CardType[];

  favorite?: boolean;

  archived?: boolean;

  profileId?: string | null;
};

export default function HistoryPanel() {
  const [history, setHistory] = useState<
    ReadingHistory[]
  >([]);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          "tarot-history"
        );

      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error(
        "Erro ao carregar histórico",
        error
      );
    }
  }, []);

  function formatDate(timestamp: number) {
    return new Date(timestamp).toLocaleString(
      "pt-BR"
    );
  }

  if (history.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "20px",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.04)",
          border:
            "1px solid rgba(255,255,255,0.08)",
          color:
            "rgba(255,255,255,0.5)",
          textAlign: "center",
        }}
      >
        Nenhuma tiragem salva.
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        marginTop: "30px",
        padding: "20px",
        borderRadius: "16px",
        background:
          "rgba(255,255,255,0.04)",
        border:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px",
          fontSize: "20px",
        }}
      >
        Histórico
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {history.map((reading) => {
          return (
            <div
              key={reading.id}
              style={{
                padding: "18px",
                borderRadius: "14px",
                background:
                  "rgba(255,255,255,0.03)",
                border:
                  "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {reading.spreadType}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    fontSize: "12px",
                  }}
                >
                  {reading.favorite && (
                    <span
                      style={{
                        color: "#d4af37",
                      }}
                    >
                      ★ Favorita
                    </span>
                  )}

                  {reading.archived && (
                    <span
                      style={{
                        color:
                          "rgba(255,255,255,0.5)",
                      }}
                    >
                      Arquivada
                    </span>
                  )}
                </div>
              </div>

              {/* BOTÕES */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "18px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => {
                    const updated =
                      history.map(
                        (item) =>
                          item.id ===
                          reading.id
                            ? {
                                ...item,
                                favorite:
                                  !item.favorite,
                              }
                            : item
                      );

                    setHistory(updated);

                    localStorage.setItem(
                      "tarot-history",
                      JSON.stringify(
                        updated
                      )
                    );
                  }}
                  style={{
                    background:
                      reading.favorite
                        ? "rgba(212,175,55,0.18)"
                        : "rgba(255,255,255,0.04)",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    borderRadius:
                      "10px",

                    padding:
                      "8px 14px",

                    color: "#f5e6b8",

                    cursor: "pointer",
                  }}
                >
                  ★ Favoritar
                </button>

                <button
                  onClick={() => {
                    const updated =
                      history.map(
                        (item) =>
                          item.id ===
                          reading.id
                            ? {
                                ...item,
                                archived:
                                  !item.archived,
                              }
                            : item
                      );

                    setHistory(updated);

                    localStorage.setItem(
                      "tarot-history",
                      JSON.stringify(
                        updated
                      )
                    );
                  }}
                  style={{
                    background:
                      "rgba(255,255,255,0.04)",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    borderRadius:
                      "10px",

                    padding:
                      "8px 14px",

                    color:
                      "rgba(255,255,255,0.75)",

                    cursor: "pointer",
                  }}
                >
                  🗄 Arquivar
                </button>

                <button
                  onClick={() => {
                    const updated =
                      history.filter(
                        (item) =>
                          item.id !==
                          reading.id
                      );

                    setHistory(updated);

                    localStorage.setItem(
                      "tarot-history",
                      JSON.stringify(
                        updated
                      )
                    );
                  }}
                  style={{
                    background:
                      "rgba(120,0,0,0.18)",

                    border:
                      "1px solid rgba(255,0,0,0.15)",

                    borderRadius:
                      "10px",

                    padding:
                      "8px 14px",

                    color:
                      "rgba(255,180,180,0.9)",

                    cursor: "pointer",
                  }}
                >
                  🗑 Excluir
                </button>
              </div>

              {/* DATA */}
              <div
                style={{
                  color:
                    "rgba(255,255,255,0.55)",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {formatDate(reading.date)}
              </div>

              {/* CARTAS */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {reading.cards.map(
                  (card, index) => (
                    <div
                      key={index}
                      style={{
                        transform:
                          "scale(0.72)",
                        transformOrigin:
                          "top left",
                      }}
                    >
                      <TarotCard
                        card={{
                          ...card,
                          revealed: true,
                        }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}