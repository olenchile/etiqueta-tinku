"use client";

import { forwardRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Etiqueta Tinkubar — Pisco Sour
   Diseño: oval, ilustración limón acuarela, motivos andinos,
   mancha azul acuarela, logo Tinku + "Restobar TINKU"
   Dimensiones físicas: 7cm × 10cm (oval vertical botella)
   ───────────────────────────────────────────────────────────── */

interface EtiquetaBottleProps {
  drink?: string;
  showCutLines?: boolean;
}

const EtiquetaBottle = forwardRef<HTMLDivElement, EtiquetaBottleProps>(
  ({ drink = "PISCO SOUR", showCutLines = true }, ref) => {
    return (
      <div className="relative" style={{ display: "inline-block" }}>
        {/* Línea de corte (troquel oval) */}
        {showCutLines && (
          <div
            className="no-print absolute pointer-events-none"
            style={{
              inset: "-3px",
              border: "1.5px dashed rgba(100,80,40,0.35)",
              borderRadius: "50%",
              zIndex: 10,
            }}
          />
        )}

        {/* ── ETIQUETA OVAL ── */}
        <div
          ref={ref}
          data-etiqueta="true"
          style={{
            width:    "7cm",
            height:   "10cm",
            position: "relative",
            overflow: "hidden",
            borderRadius: "50%",
            /* Fondo pergamino crema */
            backgroundColor: "#f2ede0",
            /* Sombra suave */
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact",
          } as React.CSSProperties}
        >
          {/* ── FONDO: motivos andinos tenues ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
                  <rect width='80' height='80' fill='none'/>
                  <!-- Motivo andino estilizado -->
                  <path d='M10 40 L20 20 L30 40 L40 20 L50 40 L60 20 L70 40' stroke='%23c8b89a' stroke-width='1.2' fill='none' opacity='0.35'/>
                  <path d='M0 55 L10 45 L20 55 L30 45 L40 55 L50 45 L60 55 L70 45 L80 55' stroke='%23c8b89a' stroke-width='1' fill='none' opacity='0.25'/>
                  <rect x='5' y='60' width='8' height='8' fill='none' stroke='%23c8b89a' stroke-width='0.8' opacity='0.2'/>
                  <rect x='35' y='10' width='8' height='8' fill='none' stroke='%23c8b89a' stroke-width='0.8' opacity='0.2'/>
                  <rect x='65' y='60' width='8' height='8' fill='none' stroke='%23c8b89a' stroke-width='0.8' opacity='0.2'/>
                </svg>`
              )}")`,
              backgroundRepeat: "repeat",
              backgroundSize: "80px 80px",
              opacity: 0.6,
            }}
          />

          {/* ── MANCHA ACUARELA AZUL (esquina inferior derecha) ── */}
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              right: "-15px",
              width: "3.5cm",
              height: "3cm",
              background: "radial-gradient(ellipse at center, rgba(100,140,190,0.45) 0%, rgba(120,160,210,0.25) 50%, transparent 75%)",
              borderRadius: "60% 40% 50% 70%",
              filter: "blur(8px)",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            } as React.CSSProperties}
          />

          {/* ── MANCHA ACUARELA AZUL SECUNDARIA ── */}
          <div
            style={{
              position: "absolute",
              bottom: "1.5cm",
              right: "0.2cm",
              width: "2cm",
              height: "2cm",
              background: "radial-gradient(ellipse at center, rgba(80,120,180,0.3) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(6px)",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            } as React.CSSProperties}
          />

          {/* ── ILUSTRACIÓN: limón con ramas y hojas (SVG botánico) ── */}
          <div
            style={{
              position: "absolute",
              top: "1.2cm",
              left: "50%",
              transform: "translateX(-50%)",
              width: "6cm",
              height: "6.5cm",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 220 260"
              width="100%"
              height="100%"
              style={{ overflow: "visible" }}
            >
              {/* ── Ramas principales ── */}
              <path d="M90 200 Q100 160 120 120 Q140 80 160 50" stroke="#4a5e2a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M120 120 Q145 100 170 90" stroke="#4a5e2a" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M130 140 Q155 125 175 115" stroke="#4a5e2a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <path d="M140 100 Q155 80 165 65" stroke="#4a5e2a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <path d="M110 155 Q90 140 75 130" stroke="#4a5e2a" strokeWidth="1.6" fill="none" strokeLinecap="round"/>

              {/* ── Hojas ── */}
              {/* Hoja grande superior derecha */}
              <ellipse cx="175" cy="82" rx="22" ry="12" fill="#5a7a30" opacity="0.85"
                transform="rotate(-30 175 82)"/>
              <ellipse cx="175" cy="82" rx="22" ry="12" fill="none" stroke="#3a5a1a" strokeWidth="0.8"
                transform="rotate(-30 175 82)" opacity="0.6"/>
              <path d="M158 90 Q175 82 192 74" stroke="#3a5a1a" strokeWidth="0.6" fill="none" opacity="0.5"
                transform="rotate(-30 175 82)"/>

              {/* Hoja media derecha */}
              <ellipse cx="178" cy="108" rx="20" ry="10" fill="#6a8a35" opacity="0.8"
                transform="rotate(-20 178 108)"/>
              <ellipse cx="178" cy="108" rx="20" ry="10" fill="none" stroke="#3a5a1a" strokeWidth="0.7"
                transform="rotate(-20 178 108)" opacity="0.5"/>

              {/* Hoja superior centro */}
              <ellipse cx="155" cy="58" rx="18" ry="9" fill="#5a7a30" opacity="0.8"
                transform="rotate(-50 155 58)"/>
              <ellipse cx="155" cy="58" rx="18" ry="9" fill="none" stroke="#3a5a1a" strokeWidth="0.7"
                transform="rotate(-50 155 58)" opacity="0.5"/>

              {/* Hoja izquierda */}
              <ellipse cx="72" cy="128" rx="18" ry="9" fill="#6a8a35" opacity="0.75"
                transform="rotate(20 72 128)"/>
              <ellipse cx="72" cy="128" rx="18" ry="9" fill="none" stroke="#3a5a1a" strokeWidth="0.7"
                transform="rotate(20 72 128)" opacity="0.5"/>

              {/* Hoja pequeña superior */}
              <ellipse cx="165" cy="48" rx="14" ry="7" fill="#7a9a40" opacity="0.7"
                transform="rotate(-60 165 48)"/>

              {/* Hoja pequeña media */}
              <ellipse cx="145" cy="95" rx="15" ry="7" fill="#5a7a30" opacity="0.75"
                transform="rotate(-40 145 95)"/>

              {/* ── Limón de Pica (amarillo-verde) ── */}
              {/* Sombra del limón */}
              <ellipse cx="82" cy="178" rx="42" ry="38" fill="rgba(0,0,0,0.08)" transform="translate(4,4)"/>
              {/* Cuerpo del limón */}
              <ellipse cx="82" cy="175" rx="42" ry="38"
                fill="url(#limonGrad)" opacity="0.95"/>
              {/* Textura del limón */}
              <ellipse cx="82" cy="175" rx="42" ry="38"
                fill="none" stroke="#b8960a" strokeWidth="1.2" opacity="0.4"/>
              {/* Brillo */}
              <ellipse cx="68" cy="158" rx="14" ry="10"
                fill="rgba(255,255,220,0.5)" transform="rotate(-20 68 158)"/>
              <ellipse cx="62" cy="154" rx="7" ry="5"
                fill="rgba(255,255,240,0.7)" transform="rotate(-20 62 154)"/>
              {/* Punta del limón */}
              <path d="M122 168 Q132 170 128 178 Q124 185 118 180" fill="#c8a820" opacity="0.7"/>

              {/* Gradiente del limón */}
              <defs>
                <radialGradient id="limonGrad" cx="40%" cy="35%" r="65%">
                  <stop offset="0%"   stopColor="#f0d060"/>
                  <stop offset="40%"  stopColor="#d4a820"/>
                  <stop offset="75%"  stopColor="#b88a10"/>
                  <stop offset="100%" stopColor="#8a6008"/>
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* ── TEXTO "PISCO SOUR" curvo en la parte superior ── */}
          <div
            style={{
              position: "absolute",
              top: "0.5cm",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg viewBox="0 0 200 60" width="5.5cm" height="1.6cm">
              <defs>
                <path id="arcTop" d="M 20,50 A 80,80 0 0,1 180,50"/>
              </defs>
              <text
                fontFamily="'Playfair Display', Georgia, serif"
                fontSize="26"
                fontWeight="700"
                fontStyle="italic"
                fill="#1a2040"
                letterSpacing="3"
              >
                <textPath href="#arcTop" startOffset="50%" textAnchor="middle">
                  {drink}
                </textPath>
              </text>
            </svg>
          </div>

          {/* ── LOGO TINKU + "Restobar TINKU" (parte inferior) ── */}
          <div
            style={{
              position: "absolute",
              bottom: "0.6cm",
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            {/* Figura sentada con taza (logo Tinku estilizado SVG) */}
            <svg viewBox="0 0 60 50" width="1.4cm" height="1.1cm" style={{ opacity: 0.85 }}>
              {/* Taza con vapor */}
              <path d="M22 28 Q22 22 28 22 L38 22 Q44 22 44 28 L42 38 Q42 40 40 40 L26 40 Q24 40 24 38 Z"
                fill="none" stroke="#1a2040" strokeWidth="1.8"/>
              <path d="M44 26 Q50 26 50 31 Q50 36 44 36" fill="none" stroke="#1a2040" strokeWidth="1.5"/>
              {/* Vapor */}
              <path d="M28 20 Q27 16 29 13" stroke="#1a2040" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              <path d="M33 19 Q32 15 34 12" stroke="#1a2040" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              <path d="M38 20 Q37 16 39 13" stroke="#1a2040" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              {/* Figura sentada */}
              <circle cx="16" cy="18" r="5" fill="none" stroke="#1a2040" strokeWidth="1.5"/>
              <path d="M16 23 L16 35 Q16 38 12 40" stroke="#1a2040" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M16 28 L22 26" stroke="#1a2040" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M16 35 L20 42" stroke="#1a2040" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>

            {/* Texto "Restobar TINKU" */}
            <div style={{ textAlign: "center", lineHeight: 1.2 }}>
              <div style={{
                fontFamily: "Georgia, 'Playfair Display', serif",
                fontSize: "9px",
                color: "#2a3050",
                letterSpacing: "2px",
              }}>
                Restobar
              </div>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#1a2040",
                letterSpacing: "3px",
              }}>
                TINKU
              </div>
            </div>
          </div>

          {/* ── BORDE OVAL SUTIL ── */}
          <div
            style={{
              position: "absolute",
              inset: "3px",
              borderRadius: "50%",
              border: "1px solid rgba(180,150,80,0.3)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    );
  }
);

EtiquetaBottle.displayName = "EtiquetaBottle";
export default EtiquetaBottle;
