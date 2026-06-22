"use client";

import TarotCard from "../TarotCard";
import type { CardType } from "../../services/tarotEngine";

type Props = {
  cards: CardType[];
};

export default function AstrologicalWheelSpread({
  cards,
}: Props) {
  const positions = [
    { x: 50.0, y: 19.1, rotation: 0 },     // Casa 1

    { x: 64.8, y: 22.3, rotation: 30 },    // Casa 2
    { x: 79.7, y: 31.9, rotation: 60 },    // Casa 3
    { x: 82.9, y: 49.4, rotation: 90 },    // Casa 4
    { x: 75.8, y: 67.4, rotation: 120 },   // Casa 5
    { x: 63.8, y: 80.5, rotation: 150 },   // Casa 6

    { x: 50.0, y: 82.5, rotation: 180 },   // Casa 7

    { x: 36.3, y: 80.5, rotation: 210 },   // Casa 8
    { x: 23.9, y: 67.4, rotation: 240 },   // Casa 9
    { x: 17.1, y: 49.4, rotation: 270 },   // Casa 10
    { x: 20.3, y: 31.9, rotation: 300 },   // Casa 11
    { x: 35.1, y: 22.3, rotation: 330 },   // Casa 12
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1254px",
        aspectRatio: "1 / 1",
        margin: "0 auto",

        backgroundImage:
          "url('/cards/astrological-wheel.png')",

        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {cards.map((card, index) => {
        const position =
          positions[index % positions.length];

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                transform: `rotate(${position.rotation}deg)`,
                transformOrigin: "center center",
              }}
            >
              <TarotCard
                card={card}
                width={110}
                height={180}
              />
            </div>

            {card.revealed && (
              <div
                style={{
                  color: "#f1e7c9",
                  textAlign: "center",
                  fontSize: "14px",
                  maxWidth: "150px",

                  textShadow:
                    "0 0 12px rgba(0,0,0,0.9)",

                  lineHeight: 1.3,
                }}
              >
                {card.name}
               
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}