"use client";

import { forwardRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Etiqueta Tinkubar — imagen original + overlay tipográfico
   El dibujo del limón NO se modifica.
   Solo se mejoran: texto "PISCO SOUR" y logo "Restobar TINKU"
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
        {/* ── Línea de corte (troquel oval) ── */}
        {showCutLines && (
          <div
            className="no-print"
            style={{
              position:     "absolute",
              inset:        "-4px",
              borderRadius: "50%",
              border:       "1.5px dashed rgba(196,98,45,0.5)",
              pointerEvents: "none",
              zIndex:       20,
            }}
          />
        )}

        {/* ── Contenedor oval ── */}
        <div
          ref={ref}
          data-etiqueta="true"
          style={{
            width:        "7cm",
            height:       "10cm",
            borderRadius: "50%",
            overflow:     "hidden",
            position:     "relative",
            boxShadow:    "0 6px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(200,169,110,0.2)",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust:       "exact",
          } as React.CSSProperties}
        >
          {/* ── Imagen original del limón (sin modificar) ── */}
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

          {/* ── OVERLAY: mejora tipográfica sobre la imagen ── */}
          {/* Cubre solo las zonas de texto, no el limón */}

          {/* Zona superior: reemplaza "PISCO SOUR" con tipografía premium */}
          <div
            style={{
              position:   "absolute",
              top:        0,
              left:       0,
              right:      0,
              height:     "28%",
              display:    "flex",
              alignItems: "center",
              justifyContent: "center",
              /* Gradiente sutil para cubrir el texto original */
              background: "linear-gradient(to bottom, rgba(242,237,224,0.92) 0%, rgba(242,237,224,0.75) 70%, transparent 100%)",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust:       "exact",
            } as React.CSSProperties}
          >
            {/* Texto curvo SVG premium */}
            <svg
              viewBox="0 0 200 70"
              style={{ width: "90%", height: "auto", overflow: "visible" }}
            >
              <defs>
                <path id="arcLabel" d="M 15,58 A 85,85 0 0,1 185,58"/>
                {/* Sombra de texto */}
                <filter id="textShadow" x="-5%" y="-5%" width="110%" height="110%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.15)"/>
                </filter>
              </defs>
              {/* Texto principal curvo */}
              <text
                fontFamily="'Playfair Display', 'Times New Roman', Georgia, serif"
                fontSize="24"
                fontWeight="700"
                fontStyle="italic"
                fill="#1a2040"
                letterSpacing="2"
                filter="url(#textShadow)"
              >
                <textPath href="#arcLabel" startOffset="50%" textAnchor="middle">
                  {label}
                </textPath>
              </text>
            </svg>
          </div>

          {/* Zona inferior: reemplaza logo y "Restobar TINKU" */}
          <div
            style={{
              position:   "absolute",
              bottom:     0,
              left:       0,
              right:      0,
              height:     "26%",
              display:    "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: "6%",
              /* Gradiente para cubrir el texto/logo original */
              background: "linear-gradient(to top, rgba(200,220,240,0.88) 0%, rgba(200,220,240,0.65) 60%, transparent 100%)",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust:       "exact",
            } as React.CSSProperties}
          >
            {/* Logo Tinku SVG rediseñado — figura meditando con taza */}
            <svg
              viewBox="0 0 80 44"
              style={{ width: "2cm", height: "1.1cm", marginBottom: "2px" }}
            >
              {/* Taza con vapor */}
              <rect x="28" y="22" width="24" height="14" rx="2"
                fill="none" stroke="#1a2040" strokeWidth="1.6"/>
              <path d="M52 25 Q58 25 58 30 Q58 35 52 35"
                fill="none" stroke="#1a2040" strokeWidth="1.4"/>
              {/* Vapor */}
              <path d="M34 20 Q33 16 35 13" stroke="#1a2040" strokeWidth="1.1"
                fill="none" strokeLinecap="round"/>
              <path d="M40 19 Q39 15 41 12" stroke="#1a2040" strokeWidth="1.1"
                fill="none" strokeLinecap="round"/>
              <path d="M46 20 Q45 16 47 13" stroke="#1a2040" strokeWidth="1.1"
                fill="none" strokeLinecap="round"/>
              {/* Figura sentada */}
              <circle cx="14" cy="14" r="5" fill="none" stroke="#1a2040" strokeWidth="1.4"/>
              <path d="M14 19 L14 30 Q14 33 10 35"
                stroke="#1a2040" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
              <path d="M14 24 L20 22"
                stroke="#1a2040" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
              <path d="M14 30 L18 37"
                stroke="#1a2040" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            </svg>

            {/* Texto "Restobar TINKU" rediseñado */}
            <div style={{ textAlign: "center", lineHeight: 1.15 }}>
              <div style={{
                fontFamily:    "'Playfair Display', Georgia, serif",
                fontSize:      "9px",
                fontStyle:     "italic",
                color:         "#2a3050",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}>
                Restobar
              </div>
              <div style={{
                fontFamily:    "'Playfair Display', Georgia, serif",
                fontSize:      "16px",
                fontWeight:    700,
                color:         "#1a2040",
                letterSpacing: "5px",
                textTransform: "uppercase",
                lineHeight:    1,
              }}>
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
