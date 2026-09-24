"use client";

import { forwardRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Etiqueta Tinkubar — etiqueta_2.jpeg recortada (738×1106px)
   Imagen limpia sin barras negras.
   Overlay: "PISCO SOUR" arriba + logo SVG Tinku abajo.
   El logo ya incluye "Restobar TINKU" como paths vectoriales.
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
          position:      "relative",
          display:       "inline-flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           "8px",
        }}
      >
        {/* ── Línea de corte (troquel oval) ── */}
        {showCutLines && (
          <div
            className="no-print"
            style={{
              position:      "absolute",
              inset:         "-5px",
              borderRadius:  "50%",
              border:        "1.5px dashed rgba(196,98,45,0.45)",
              pointerEvents: "none",
              zIndex:        20,
            }}
          />
        )}

        {/* ── Contenedor oval principal ── */}
        <div
          ref={ref}
          data-etiqueta="true"
          style={{
            width:        "7cm",
            height:       "10cm",
            borderRadius: "50%",
            overflow:     "hidden",
            position:     "relative",
            boxShadow:    "0 8px 40px rgba(0,0,0,0.5)",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust:       "exact",
          } as React.CSSProperties}
        >
          {/* ── Imagen base: oval del limón (sin barras negras) ── */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt="Etiqueta Tinkubar"
            style={{
              position:       "absolute",
              inset:          0,
              width:          "100%",
              height:         "100%",
              objectFit:      "cover",
              objectPosition: "center center",
              display:        "block",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust:       "exact",
            } as React.CSSProperties}
          />

          {/* ══════════════════════════════════════════════════
              ZONA SUPERIOR — "PISCO SOUR"
              Fondo crema/blanco natural del oval (parte alta)
              ══════════════════════════════════════════════════ */}
          <div
            style={{
              position:       "absolute",
              top:            "5%",
              left:           0,
              right:          0,
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              gap:            "4px",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust:       "exact",
            } as React.CSSProperties}
          >
            {/* Línea decorativa */}
            <div style={{
              width:      "50%",
              height:     "1px",
              background: "rgba(28,35,64,0.45)",
            }} />

            {/* Texto PISCO SOUR — IM Fell English italic */}
            <div
              style={{
                fontFamily:    "'IM Fell English', 'Playfair Display', Georgia, serif",
                fontSize:      "19px",
                fontStyle:     "italic",
                fontWeight:    400,
                color:         "#1c2340",
                letterSpacing: "4px",
                textTransform: "uppercase",
                textAlign:     "center",
                lineHeight:    1,
                /* Halo blanco para legibilidad */
                textShadow:    "0 0 10px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.08)",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust:       "exact",
              } as React.CSSProperties}
            >
              {label}
            </div>

            {/* Línea decorativa */}
            <div style={{
              width:      "50%",
              height:     "1px",
              background: "rgba(28,35,64,0.45)",
            }} />
          </div>

          {/* ══════════════════════════════════════════════════
              ZONA INFERIOR — Logo SVG oficial Tinku
              El SVG logo_tinku2026_clean ya incluye el texto
              "Restobar TINKU" como paths vectoriales.
              viewBox: 0 0 1024 683 — fill: #1c2340 directo
              ══════════════════════════════════════════════════ */}
          <div
            style={{
              position:       "absolute",
              bottom:         "5%",
              left:           0,
              right:          0,
              display:        "flex",
              justifyContent: "center",
              alignItems:     "center",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust:       "exact",
            } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-tinku.svg"
              alt="Logo Tinku"
              style={{
                width:     "3.5cm",
                height:    "auto",
                maxHeight: "2.3cm",
                objectFit: "contain",
                /* Sin filtro — el SVG ya tiene fill:#1c2340 */
                WebkitPrintColorAdjust: "exact",
                printColorAdjust:       "exact",
              } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Etiqueta de nombre (solo pantalla) */}
        {showCutLines && (
          <div
            className="no-print"
            style={{
              fontFamily:    "'IM Fell English', var(--font-playfair), serif",
              fontSize:      "10px",
              fontStyle:     "italic",
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
