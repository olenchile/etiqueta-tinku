"use client";

import { forwardRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Etiqueta Tinkubar — etiqueta_2.jpeg (imagen limpia sin texto)
   + overlay tipográfico premium con IM Fell English
   + logo SVG oficial Tinku
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
          position:       "relative",
          display:        "inline-flex",
          flexDirection:  "column",
          alignItems:     "center",
          gap:            "8px",
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
            boxShadow:    "0 8px 40px rgba(0,0,0,0.5), 0 2px 10px rgba(180,150,90,0.25)",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust:       "exact",
          } as React.CSSProperties}
        >
          {/* ── Imagen base: ilustración acuarela del limón ── */}
          {/* objectPosition ajustado para recortar barras negras del screenshot */}
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
              objectPosition: "center 22%",
              display:        "block",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust:       "exact",
            } as React.CSSProperties}
          />

          {/* ══════════════════════════════════════════════════
              OVERLAY SUPERIOR — "PISCO SOUR" tipografía premium
              Zona crema/blanca libre en la parte alta del oval
              ══════════════════════════════════════════════════ */}
          <div
            style={{
              position:       "absolute",
              top:            0,
              left:           0,
              right:          0,
              height:         "24%",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              /* Sin gradiente opaco — texto directo sobre el fondo crema natural */
              WebkitPrintColorAdjust: "exact",
              printColorAdjust:       "exact",
            } as React.CSSProperties}
          >
            {/* Texto curvo SVG — IM Fell English italic */}
            <svg
              viewBox="0 0 220 80"
              style={{ width: "88%", height: "auto", overflow: "visible" }}
            >
              <defs>
                {/* Arco suave para el texto curvo */}
                <path id="arcTop" d="M 20,68 A 90,90 0 0,1 200,68" />
                {/* Sombra muy sutil para legibilidad */}
                <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="0.5" stdDeviation="0.8"
                    floodColor="rgba(255,255,255,0.9)" floodOpacity="1"/>
                </filter>
                <filter id="textGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.5"
                    floodColor="rgba(0,0,0,0.2)" floodOpacity="1"/>
                </filter>
              </defs>

              {/* Halo blanco detrás del texto para legibilidad */}
              <text
                fontFamily="'IM Fell English', 'Playfair Display', 'Times New Roman', Georgia, serif"
                fontSize="22"
                fontWeight="400"
                fontStyle="italic"
                fill="rgba(255,255,255,0.85)"
                letterSpacing="1.5"
                filter="url(#softShadow)"
                strokeWidth="4"
                stroke="rgba(255,255,255,0.7)"
                paintOrder="stroke"
              >
                <textPath href="#arcTop" startOffset="50%" textAnchor="middle">
                  {label}
                </textPath>
              </text>

              {/* Texto principal — color oscuro elegante */}
              <text
                fontFamily="'IM Fell English', 'Playfair Display', 'Times New Roman', Georgia, serif"
                fontSize="22"
                fontWeight="400"
                fontStyle="italic"
                fill="#1c2340"
                letterSpacing="1.5"
                filter="url(#textGlow)"
              >
                <textPath href="#arcTop" startOffset="50%" textAnchor="middle">
                  {label}
                </textPath>
              </text>
            </svg>
          </div>

          {/* ══════════════════════════════════════════════════
              OVERLAY INFERIOR — Logo SVG oficial Tinku + nombre
              Zona sobre la mancha azul acuarela (parte baja)
              ══════════════════════════════════════════════════ */}
          <div
            style={{
              position:       "absolute",
              bottom:         0,
              left:           0,
              right:          0,
              height:         "30%",
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "flex-end",
              paddingBottom:  "7%",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust:       "exact",
            } as React.CSSProperties}
          >
            {/* Logo SVG oficial Tinku — escalado y coloreado */}
            {/* El SVG original es 1536×1024 con paths complejos */}
            {/* Usamos <img> con el SVG para máxima fidelidad */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-tinku.svg"
              alt="Logo Tinku"
              style={{
                width:           "2.8cm",
                height:          "auto",
                maxHeight:       "1.4cm",
                objectFit:       "contain",
                marginBottom:    "3px",
                filter:          "brightness(0) invert(0) sepia(1) saturate(0) brightness(0.15)",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust:       "exact",
              } as React.CSSProperties}
            />

            {/* Nombre del restobar */}
            <div style={{ textAlign: "center", lineHeight: 1.1 }}>
              <div
                style={{
                  fontFamily:    "'IM Fell English', 'Playfair Display', Georgia, serif",
                  fontSize:      "7.5px",
                  fontStyle:     "italic",
                  color:         "#2a3050",
                  letterSpacing: "3.5px",
                  textTransform: "uppercase",
                  textShadow:    "0 0 6px rgba(255,255,255,0.8)",
                }}
              >
                Restobar
              </div>
              <div
                style={{
                  fontFamily:    "'IM Fell English', 'Playfair Display', Georgia, serif",
                  fontSize:      "15px",
                  fontWeight:    400,
                  fontStyle:     "normal",
                  color:         "#1a2040",
                  letterSpacing: "6px",
                  textTransform: "uppercase",
                  lineHeight:    1,
                  textShadow:    "0 0 8px rgba(255,255,255,0.9), 0 1px 3px rgba(0,0,0,0.2)",
                }}
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
