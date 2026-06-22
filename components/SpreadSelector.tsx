"use client";

import { useEffect, useState } from "react";

type SpreadType =
  | "three"
  | "celtic"
  | "astrological"
  | "free";

type Props = {
  spreadType: SpreadType;

  setSpreadType: (
    type: SpreadType
  ) => void;
};

export default function SpreadSelector({
  spreadType,
  setSpreadType,
}: Props) {
  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    checkScreen();

    window.addEventListener(
      "resize",
      checkScreen
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkScreen
      );
  }, []);

  function buttonStyle(
    type: SpreadType
  ): React.CSSProperties {
    const active = spreadType === type;

    return {
      padding: "16px 34px",
      borderRadius: "18px",

      border: active
        ? "1px solid #d4af37"
        : "1px solid rgba(212,175,55,0.22)",

      background: active
        ? "rgba(212,175,55,0.08)"
        : "rgba(0,0,0,0.45)",

      color: active
        ? "#f4d27a"
        : "#f1e7c9",

      cursor: "pointer",

      transition: "all 0.35s ease",

      fontSize: "22px",

      letterSpacing: "1px",

      minWidth: "180px",

      boxShadow: active
        ? "0 0 20px rgba(212,175,55,0.18)"
        : "0 0 12px rgba(0,0,0,0.35)",

      backdropFilter: "blur(6px)",
    };
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
        marginTop: "20px",
      }}
    >
      <button
        onClick={() =>
          setSpreadType("three")
        }
        style={buttonStyle("three")}
      >
        3 Cartas
      </button>

      {!isMobile && (
        <button
          onClick={() =>
            setSpreadType("celtic")
          }
          style={buttonStyle("celtic")}
        >
          Cruz Celta
        </button>
      )}

      {!isMobile && (
        <button
          onClick={() =>
            setSpreadType(
              "astrological"
            )
          }
          style={buttonStyle(
            "astrological"
          )}
        >
          Mandala Astrológica
        </button>
      )}

      <button
        onClick={() =>
          setSpreadType("free")
        }
        style={buttonStyle("free")}
      >
        Mesa Livre
      </button>
    </div>
  );
}