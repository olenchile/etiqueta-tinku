"use client";

import { forwardRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Etiqueta Tinkubar — etiqueta_2.jpeg (imagen limpia sin texto)
   Diseño: texto PISCO SOUR arriba + logo Tinku abajo
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
          {/* ── Imagen base: ilustración acuarela del limón ── */}
          {/* La imagen tiene barras negras arriba/abajo (screenshot).
              Usamos objectPosition para centrar el oval de la ilustración */}
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
              objectPosition: "center 30%",
              display:        "block",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust:       "exact",
            } as React.CSSProperties}
          />

          {/* ══════════════════════════════════════════════════
              ZONA SUPERIOR — "PISCO SOUR"
              Fondo crema/blanco natural de la imagen
              Texto grande con IM Fell English italic
              ══════════════════════════════════════════════════ */}
          <div
            style={{
              position:       "absolute",
              top:            "4%",
              left:           "10%",
              right:          "10%",
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              gap:            "2px",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust:       "exact",
            } as React.CSSProperties}
          >
            {/* Línea decorativa superior */}
            <div style={{
              width:           "60%",
              height:          "1px",
              background:      "rgba(28,35,64,0.35)",
              marginBottom:    "4px",
            }} />

            {/* Texto principal PISCO SOUR */}
            <div
              style={{
                fontFamily:    "'IM Fell English', 'Playfair Display', Georgia, serif",
                fontSize:      "22px",
                fontStyle:     "italic",
                fontWeight:    400,
                color:         "#1c2340",
                letterSpacing: "3px",
                textTransform: "uppercase",
                textAlign:     "center",
                lineHeight:    1,
                textShadow:    "0 1px 4px rgba(255,255,255,0.9), 0 0 12px rgba(255,255,255,0.7)",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust:       "exact",
              } as React.CSSProperties}
            >
              {label}
            </div>

            {/* Línea decorativa inferior */}
            <div style={{
              width:        "60%",
              height:       "1px",
              background:   "rgba(28,35,64,0.35)",
              marginTop:    "4px",
            }} />
          </div>

          {/* ══════════════════════════════════════════════════
              ZONA INFERIOR — Logo Tinku + "Restobar TINKU"
              Sobre la mancha azul acuarela
              ══════════════════════════════════════════════════ */}
          <div
            style={{
              position:       "absolute",
              bottom:         "4%",
              left:           0,
              right:          0,
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              gap:            "2px",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust:       "exact",
            } as React.CSSProperties}
          >
            {/* Logo SVG oficial Tinku */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-tinku.svg"
              alt="Logo Tinku"
              style={{
                width:           "3.2cm",
                height:          "auto",
                maxHeight:       "1.6cm",
                objectFit:       "contain",
                /* Convierte el SVG a color oscuro navy */
                filter:          "brightness(0) saturate(100%) invert(12%) sepia(30%) saturate(800%) hue-rotate(200deg) brightness(0.4)",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust:       "exact",
              } as React.CSSProperties}
            />

            {/* Texto "Restobar TINKU" */}
            <div style={{ textAlign: "center", lineHeight: 1.15 }}>
              <div
                style={{
                  fontFamily:    "'IM Fell English', 'Playfair Display', Georgia, serif",
                  fontSize:      "7px",
                  fontStyle:     "italic",
                  color:         "#1c2340",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  textShadow:    "0 0 8px rgba(255,255,255,0.8)",
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust:       "exact",
                } as React.CSSProperties}
              >
                Restobar
              </div>
              <div
                style={{
                  fontFamily:    "'IM Fell English', 'Playfair Display', Georgia, serif",
                  fontSize:      "14px",
                  fontWeight:    400,
                  color:         "#1c2340",
                  letterSpacing: "7px",
                  textTransform: "uppercase",
                  lineHeight:    1,
                  textShadow:    "0 0 10px rgba(255,255,255,0.9), 0 1px 3px rgba(0,0,0,0.15)",
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust:       "exact",
                } as React.CSSProperties}
              >
                TINKU
              </div>
            </div>
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
