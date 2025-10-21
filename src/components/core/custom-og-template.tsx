import type { RenderFunctionInput } from "astro-opengraph-images";
import React from "react";

export async function CustomOGTemplate({
  title,
  description,
}: RenderFunctionInput): Promise<React.ReactNode> {
  return Promise.resolve(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        padding: "80px",
      }}
    >
      {/* Główny tytuł */}
      <h1
        style={{
          fontSize: "72px",
          fontWeight: 700,
          color: "#ffffff",
          textAlign: "center",
          margin: "0",
          lineHeight: 1.2,
          maxWidth: "1000px",
        }}
      >
        {title}
      </h1>

      {/* Podtytuł/opis */}
      {description && (
        <p
          style={{
            fontSize: "36px",
            fontWeight: 400,
            color: "#9ca3af",
            textAlign: "center",
            margin: "40px 0 0 0",
            lineHeight: 1.4,
            maxWidth: "900px",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
