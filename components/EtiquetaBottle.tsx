"use client";

import { forwardRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Etiqueta Tinkubar — usa la imagen original sin modificar
   La imagen se muestra centrada dentro del contorno oval
   con bordes de corte (troquel) para impresión
   ───────────────────────────────────────────────────────────── */

interface EtiquetaBottleProps {
  imageSrc?: string;
  showCutLines?: boolean;
  label?: string;
}

const EtiquetaBottle = forwardRef<HTMLDivElement, EtiquetaBottleProps>(
  (
    {
      imageSrc = "/etiqueta-ref.jpeg",
      showCutLines = true,
      label = "PISCO SOUR",
    },
    ref
  ) => {
    return (
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* ── Línea de corte exterior (troquel oval) ── */}
        {showCutLines && (
          <div
            className="no-print"
            style={{
              position: "absolute",
              /* La imagen tiene proporción ~3:4 (ancho:alto) */
              inset: "-4px",
              borderRadius: "50%",
              border: "1.5px dashed rgba(196,98,45,0.5)",
              pointerEvents: "none",
              zIndex: 10,
            }}
          />
        )}

        {/* ── Contenedor oval con la imagen ── */}
        <div
          ref={ref}
          data-etiqueta="true"
          style={{
            /* Dimensiones físicas: 7cm × 10cm */
            width:        "7cm",
            height:       "10cm",
            borderRadius: "50%",
            overflow:     "hidden",
            position:     "relative",
            /* Sombra para preview en pantalla */
            boxShadow:    "0 6px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(200,169,110,0.2)",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust:       "exact",
          } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={label}
            style={{
              width:      "100%",
              height:     "100%",
              objectFit:  "cover",
              objectPosition: "center center",
              display:    "block",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust:       "exact",
            } as React.CSSProperties}
          />
        </div>

        {/* ── Etiqueta de nombre (solo en pantalla, no en PDF) ── */}
        {showCutLines && (
          <div
            className="no-print"
            style={{
              fontFamily:    "var(--font-playfair), serif",
              fontSize:      "10px",
              letterSpacing: "2px",
              color:         "#8a7a5a",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
        )}
      </div>
    );
  }
);

EtiquetaBottle.displayName = "EtiquetaBottle";
export default EtiquetaBottle;
