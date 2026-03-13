"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("EvalTravaux Error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#ffffff",
        color: "#0f172a",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Une erreur s&apos;est produite
      </h1>
      <p style={{ marginBottom: 24, color: "#64748b" }}>{error.message}</p>
      <button
        onClick={reset}
        style={{
          padding: "12px 24px",
          backgroundColor: "#0f2b46",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Réessayer
      </button>
    </div>
  );
}
