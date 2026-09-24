"use client";

import { forwardRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Etiqueta para botella Puyehue 330cc
   Dimensiones físicas: 21cm × 3.5cm (troquel con arco curvo)
   Zona lisa central de la botella — tronco de cono
   ───────────────────────────────────────────────────────────── */

interface EtiquetaBottleProps {
  variant?: "clasica" | "premium" | "evento";
  showCutLines?: boolean;
}

const EtiquetaBottle = forwardRef<HTMLDivElement, EtiquetaBottleProps>(
  ({ variant = "clasica", showCutLines = true }, ref) => {
    const config = {
      clasica: {
        headerColor: "#c4622d",
        accentColor: "#c8a96e",
        tagline: "Bar & Restaurant",
        subtitle: "Agua de la Casa",
        bg: "#f5edd8",
      },
      premium: {
        headerColor: "#3d7a72",
        accentColor: "#c8a96e",
        tagline: "Selección Premium",
        subtitle: "Agua Mineral",
        bg: "#f0ede4",
      },
      evento: {
        headerColor: "#9b2d7a",
        accentColor: "#c8a96e",
        tagline: "Edición Especial",
        subtitle: "Evento Tinkubar",
        bg: "#f5edd8",
      },
    }[variant];

    /* Patrón andino SVG inline */
    const andeanPattern = `url("data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'>
        <rect width='20' height='20' fill='${config.bg}'/>
        <path d='M0 10h5v-5h5v5h5v-5h5' stroke='%23c8a96e' stroke-width='0.4' fill='none' opacity='0.2'/>
      </svg>`
    )}")`;

    return (
      <div className="relative" style={{ display: "inline-block" }}>
        {/* Líneas de corte (troquel) — solo visual, no se imprimen */}
        {showCutLines && (
          <div
            className="no-print absolute inset-0 pointer-events-none"
            style={{
              border: "1px dashed rgba(200,169,110,0.4)",
              borderRadius: "4px",
              zIndex: 10,
            }}
          />
        )}

        {/* ── ETIQUETA PRINCIPAL ── */}
        <div
          ref={ref}
          data-etiqueta="true"
          style={{
            /* Dimensiones físicas: 21cm × 3.5cm */
            width: "21cm",
            height: "3.5cm",
            position: "relative",
            overflow: "hidden",
            backgroundColor: config.bg,
            backgroundImage: andeanPattern,
            backgroundRepeat: "repeat",
            backgroundSize: "20px 20px",
            display: "flex",
            alignItems: "stretch",
            /* Troquel: bordes superiores e inferiores curvados (arco) */
            borderRadius: "0 0 0 0",
            clipPath: "polygon(0% 8%, 2% 0%, 98% 0%, 100% 8%, 100% 92%, 98% 100%, 2% 100%, 0% 92%)",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact",
          } as React.CSSProperties}
        >
          {/* ── FRANJA IZQUIERDA (color) ── */}
          <div
            style={{
              width: "1.2cm",
              backgroundColor: config.headerColor,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            } as React.CSSProperties}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontFamily: "'Playfair Display', serif",
                fontSize: "7px",
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#fff",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              TINKUBAR
            </span>
          </div>

          {/* ── LOGO OVAL ── */}
          <div
            style={{
              width: "2.8cm",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 6px",
              borderRight: `0.5px solid ${config.accentColor}`,
            }}
          >
            <div
              style={{
                width: "2.2cm",
                height: "2.2cm",
                borderRadius: "50%",
                border: `1.5px solid ${config.accentColor}`,
                overflow: "hidden",
                backgroundColor: config.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact",
              } as React.CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-tinku.svg"
                alt="Tinku"
                style={{ width: "1.8cm", height: "1.8cm", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* ── CONTENIDO CENTRAL ── */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 10px",
              gap: "2px",
            }}
          >
            {/* Línea decorativa superior */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%" }}>
              <div style={{ flex: 1, height: "0.5px", background: config.accentColor, opacity: 0.6 }} />
              <span style={{ color: config.accentColor, fontSize: "8px" }}>✦</span>
              <div style={{ flex: 1, height: "0.5px", background: config.accentColor, opacity: 0.6 }} />
            </div>

            {/* Nombre principal */}
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "6px",
                color: "#2c1810",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              TINKU
            </div>

            {/* Subtítulo */}
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "7.5px",
                letterSpacing: "2.5px",
                color: config.headerColor,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {config.subtitle}
            </div>

            {/* Tagline */}
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "7px",
                fontStyle: "italic",
                color: "#7a6a50",
                letterSpacing: "1px",
              }}
            >
              {config.tagline} · tinkubar.cl
            </div>

            {/* Línea decorativa inferior */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%" }}>
              <div style={{ flex: 1, height: "0.5px", background: config.accentColor, opacity: 0.6 }} />
              <span style={{ color: config.accentColor, fontSize: "8px" }}>✦</span>
              <div style={{ flex: 1, height: "0.5px", background: config.accentColor, opacity: 0.6 }} />
            </div>
          </div>

          {/* ── FRANJA DERECHA (patrón andino + info) ── */}
          <div
            style={{
              width: "2.8cm",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 6px",
              borderLeft: `0.5px solid ${config.accentColor}`,
              gap: "3px",
            }}
          >
            {/* Patrón andino decorativo */}
            <svg width="30" height="16" viewBox="0 0 30 16" fill="none">
              <path d="M0 8h5v-4h5v4h5v-4h5v4h5v-4h5" stroke={config.accentColor} strokeWidth="0.8" opacity="0.6"/>
              <path d="M0 12h3v-3h3v3h3v-3h3v3h3v-3h3v3h3v-3h3v3h3v-3h3" stroke={config.accentColor} strokeWidth="0.6" opacity="0.4"/>
            </svg>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "6px",
                color: "#7a6a50",
                letterSpacing: "1px",
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              330 cc
            </div>
            <svg width="30" height="16" viewBox="0 0 30 16" fill="none">
              <path d="M0 8h5v-4h5v4h5v-4h5v4h5v-4h5" stroke={config.accentColor} strokeWidth="0.8" opacity="0.6"/>
              <path d="M0 12h3v-3h3v3h3v-3h3v3h3v-3h3v3h3v-3h3v3h3v-3h3" stroke={config.accentColor} strokeWidth="0.6" opacity="0.4"/>
            </svg>
          </div>

          {/* ── FRANJA DERECHA (color) ── */}
          <div
            style={{
              width: "1.2cm",
              backgroundColor: config.headerColor,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            } as React.CSSProperties}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                fontFamily: "'Playfair Display', serif",
                fontSize: "7px",
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#fff",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              TINKUBAR
            </span>
          </div>
        </div>
      </div>
    );
  }
);

EtiquetaBottle.displayName = "EtiquetaBottle";
export default EtiquetaBottle;
