"use client";

import TarotTable from "../components/TarotTable";

export default function HomePage() {
  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <TarotTable />
    </main>
  );
}