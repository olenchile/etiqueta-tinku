"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, FileText } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Exporta etiquetas ovales como ventana de impresión
   Formato: hoja A4 con 2 columnas × N etiquetas
   ───────────────────────────────────────────────────────────── */

async function buildPrintHTML(drinks: string[], copiesEach: number): Promise<string> {
  /* ── Logo como data-URI ─────────────────────────────────── */
  let logoDataURI = "";
  try {
    const res  = await fetch("/logo-tinku.svg");
    const text = await res.text();
    logoDataURI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(text)}`;
  } catch {
    logoDataURI = "";
  }

  /* ── Genera HTML de una etiqueta oval ───────────────────── */
  const etiquetaHTML = (drink: string) => `
    <div class="etiqueta-wrap">
      <div class="etiqueta">

        <!-- Fondo motivos andinos -->
        <div class="andean-bg"></div>

        <!-- Mancha acuarela azul -->
        <div class="watercolor-blue"></div>
        <div class="watercolor-blue2"></div>

        <!-- Ilustración limón SVG -->
        <div class="limon-wrap">
          <svg viewBox="0 0 220 260" width="100%" height="100%" overflow="visible">
            <defs>
              <radialGradient id="lg${drink.replace(/\s/g,'')}" cx="40%" cy="35%" r="65%">
                <stop offset="0%"   stop-color="#f0d060"/>
                <stop offset="40%"  stop-color="#d4a820"/>
                <stop offset="75%"  stop-color="#b88a10"/>
                <stop offset="100%" stop-color="#8a6008"/>
              </radialGradient>
            </defs>
            <!-- Ramas -->
            <path d="M90 200 Q100 160 120 120 Q140 80 160 50" stroke="#4a5e2a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M120 120 Q145 100 170 90" stroke="#4a5e2a" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M130 140 Q155 125 175 115" stroke="#4a5e2a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M140 100 Q155 80 165 65" stroke="#4a5e2a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M110 155 Q90 140 75 130" stroke="#4a5e2a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
            <!-- Hojas -->
            <ellipse cx="175" cy="82" rx="22" ry="12" fill="#5a7a30" opacity="0.85" transform="rotate(-30 175 82)"/>
            <ellipse cx="178" cy="108" rx="20" ry="10" fill="#6a8a35" opacity="0.8" transform="rotate(-20 178 108)"/>
            <ellipse cx="155" cy="58" rx="18" ry="9" fill="#5a7a30" opacity="0.8" transform="rotate(-50 155 58)"/>
            <ellipse cx="72" cy="128" rx="18" ry="9" fill="#6a8a35" opacity="0.75" transform="rotate(20 72 128)"/>
            <ellipse cx="165" cy="48" rx="14" ry="7" fill="#7a9a40" opacity="0.7" transform="rotate(-60 165 48)"/>
            <ellipse cx="145" cy="95" rx="15" ry="7" fill="#5a7a30" opacity="0.75" transform="rotate(-40 145 95)"/>
            <!-- Limón -->
            <ellipse cx="82" cy="178" rx="42" ry="38" fill="rgba(0,0,0,0.08)" transform="translate(4,4)"/>
            <ellipse cx="82" cy="175" rx="42" ry="38" fill="url(#lg${drink.replace(/\s/g,'')})" opacity="0.95"/>
            <ellipse cx="68" cy="158" rx="14" ry="10" fill="rgba(255,255,220,0.5)" transform="rotate(-20 68 158)"/>
            <ellipse cx="62" cy="154" rx="7" ry="5" fill="rgba(255,255,240,0.7)" transform="rotate(-20 62 154)"/>
          </svg>
        </div>

        <!-- Texto curvo superior -->
        <div class="drink-text-wrap">
          <svg viewBox="0 0 200 60" width="100%" height="100%">
            <defs>
              <path id="arc${drink.replace(/\s/g,'')}" d="M 20,50 A 80,80 0 0,1 180,50"/>
            </defs>
            <text font-family="'Playfair Display', Georgia, serif" font-size="26"
              font-weight="700" font-style="italic" fill="#1a2040" letter-spacing="3">
              <textPath href="#arc${drink.replace(/\s/g,'')}" startOffset="50%" text-anchor="middle">
                ${drink}
              </textPath>
            </text>
          </svg>
        </div>

        <!-- Logo + Restobar TINKU -->
        <div class="footer-wrap">
          <svg viewBox="0 0 60 50" width="28" height="22" style="-webkit-print-color-adjust:exact;print-color-adjust:exact;">
            <path d="M22 28 Q22 22 28 22 L38 22 Q44 22 44 28 L42 38 Q42 40 40 40 L26 40 Q24 40 24 38 Z"
              fill="none" stroke="#1a2040" stroke-width="1.8"/>
            <path d="M44 26 Q50 26 50 31 Q50 36 44 36" fill="none" stroke="#1a2040" stroke-width="1.5"/>
            <path d="M28 20 Q27 16 29 13" stroke="#1a2040" stroke-width="1.2" fill="none" stroke-linecap="round"/>
            <path d="M33 19 Q32 15 34 12" stroke="#1a2040" stroke-width="1.2" fill="none" stroke-linecap="round"/>
            <path d="M38 20 Q37 16 39 13" stroke="#1a2040" stroke-width="1.2" fill="none" stroke-linecap="round"/>
            <circle cx="16" cy="18" r="5" fill="none" stroke="#1a2040" stroke-width="1.5"/>
            <path d="M16 23 L16 35 Q16 38 12 40" stroke="#1a2040" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <path d="M16 28 L22 26" stroke="#1a2040" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <path d="M16 35 L20 42" stroke="#1a2040" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          </svg>
          <div class="footer-text">
            <div class="footer-restobar">Restobar</div>
            <div class="footer-tinku">TINKU</div>
          </div>
        </div>

        <!-- Borde oval sutil -->
        <div class="oval-border"></div>
      </div>
    </div>`;

  /* ── Todas las etiquetas ────────────────────────────────── */
  const allLabels = drinks.flatMap((d) =>
    Array.from({ length: copiesEach }, () => etiquetaHTML(d))
  ).join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Etiquetas Tinkubar</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after {
      box-sizing: border-box; margin: 0; padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    @page { size: A4 portrait; margin: 10mm; }
    body { background: #1a1208; font-family: 'Playfair Display', Georgia, serif; }

    /* Barra superior */
    .print-bar {
      position: fixed; top: 0; left: 0; right: 0;
      background: rgba(26,18,8,0.97);
      border-bottom: 1px solid rgba(200,169,110,0.35);
      padding: 10px 20px;
      display: flex; align-items: center; justify-content: space-between;
      z-index: 9999;
    }
    .print-bar-title { font-size: 14px; font-weight: 700; letter-spacing: 4px; color: #d4a017; }
    .print-bar-hint  { font-size: 10px; color: #8a7a5a; margin-top: 2px; }
    .btn-print {
      background: linear-gradient(135deg, #c4622d, #a8501e) !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color: #fff; border: none; cursor: pointer;
      padding: 10px 24px; border-radius: 2px;
      font-family: 'Playfair Display', serif;
      font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
    }
    .spacer { height: 60px; }

    /* Grid de etiquetas */
    .grid-etiquetas {
      display: flex;
      flex-wrap: wrap;
      gap: 8mm;
      padding: 4mm;
      justify-content: center;
      align-items: flex-start;
    }

    /* Wrapper etiqueta */
    .etiqueta-wrap { display: inline-block; }

    /* Etiqueta oval: 7cm × 10cm */
    .etiqueta {
      position: relative;
      width: 7cm;
      height: 10cm;
      border-radius: 50%;
      overflow: hidden;
      background-color: #f2ede0 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Fondo andino */
    .andean-bg {
      position: absolute; inset: 0;
      background-image: url("data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
          <rect width='80' height='80' fill='none'/>
          <path d='M10 40 L20 20 L30 40 L40 20 L50 40 L60 20 L70 40' stroke='%23c8b89a' stroke-width='1.2' fill='none' opacity='0.35'/>
          <path d='M0 55 L10 45 L20 55 L30 45 L40 55 L50 45 L60 55 L70 45 L80 55' stroke='%23c8b89a' stroke-width='1' fill='none' opacity='0.25'/>
        </svg>`
      )}") !important;
      background-repeat: repeat !important;
      background-size: 80px 80px !important;
      opacity: 0.6;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Manchas acuarela */
    .watercolor-blue {
      position: absolute; bottom: -10px; right: -15px;
      width: 3.5cm; height: 3cm;
      background: radial-gradient(ellipse at center, rgba(100,140,190,0.45) 0%, rgba(120,160,210,0.25) 50%, transparent 75%) !important;
      border-radius: 60% 40% 50% 70%;
      filter: blur(8px);
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .watercolor-blue2 {
      position: absolute; bottom: 1.5cm; right: 0.2cm;
      width: 2cm; height: 2cm;
      background: radial-gradient(ellipse at center, rgba(80,120,180,0.3) 0%, transparent 70%) !important;
      border-radius: 50%;
      filter: blur(6px);
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Ilustración limón */
    .limon-wrap {
      position: absolute;
      top: 1.2cm; left: 50%;
      transform: translateX(-50%);
      width: 6cm; height: 6.5cm;
    }

    /* Texto curvo */
    .drink-text-wrap {
      position: absolute;
      top: 0.5cm; left: 0; right: 0;
      height: 1.6cm;
    }

    /* Footer */
    .footer-wrap {
      position: absolute;
      bottom: 0.6cm; left: 0; right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .footer-text { text-align: center; line-height: 1.2; }
    .footer-restobar {
      font-family: Georgia, serif;
      font-size: 9px; color: #2a3050;
      letter-spacing: 2px;
    }
    .footer-tinku {
      font-family: 'Playfair Display', serif;
      font-size: 14px; font-weight: 700;
      color: #1a2040; letter-spacing: 3px;
    }

    /* Borde oval */
    .oval-border {
      position: absolute; inset: 3px;
      border-radius: 50%;
      border: 1px solid rgba(180,150,80,0.3);
      pointer-events: none;
    }

    /* PRINT */
    @media print {
      body { background: white !important; }
      .print-bar, .spacer { display: none !important; }
      .etiqueta {
        background-color: #f2ede0 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <div>
      <div class="print-bar-title">ETIQUETAS TINKUBAR</div>
      <div class="print-bar-hint">Destino: "Guardar como PDF" · ✅ Activar "Gráficos de fondo"</div>
    </div>
    <button class="btn-print" onclick="window.print()">⬇ Guardar PDF</button>
  </div>
  <div class="spacer"></div>

  <div class="grid-etiquetas">
    ${allLabels}
  </div>

  <script>
    document.fonts.ready.then(function() {
      setTimeout(function() { window.print(); }, 1000);
    });
  </script>
</body>
</html>`;
}

/* ─────────────────────────────────────────────────────────────
   Props y componente botón
   ───────────────────────────────────────────────────────────── */
interface ExportEtiquetasProps {
  drinks?: string[];
  copiesEach?: number;
}

export default function ExportEtiquetas({
  drinks = ["PISCO SOUR"],
  copiesEach = 3,
}: ExportEtiquetasProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const html = await buildPrintHTML(drinks, copiesEach);
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url  = URL.createObjectURL(blob);
      const win  = window.open(url, "_blank", "width=960,height=860,scrollbars=yes");
      if (!win) {
        const a    = document.createElement("a");
        a.href     = url;
        a.download = "etiquetas-tinkubar.html";
        a.click();
      }
      setTimeout(() => URL.revokeObjectURL(url), 90_000);
    } catch (err) {
      console.error("Error al exportar:", err);
      alert("Error al exportar etiquetas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleExport}
      disabled={loading}
      whileHover={!loading ? { scale: 1.04, boxShadow: "0 12px 40px rgba(196,98,45,0.5)" } : {}}
      whileTap={!loading ? { scale: 0.97 } : {}}
      className="no-print flex items-center gap-2.5 px-6 py-3 rounded-sm text-white disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        background:    loading
          ? "linear-gradient(135deg, #8a7a5a, #6a5a3a)"
          : "linear-gradient(135deg, #c4622d, #a8501e)",
        boxShadow:     "0 6px 24px rgba(196,98,45,0.35)",
        fontFamily:    "var(--font-playfair), serif",
        fontSize:      "12px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
          <span>Cargando…</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 flex-shrink-0" />
          <span>Exportar PDF</span>
        </>
      )}
    </motion.button>
  );
}

export function PrintButton() {
  return (
    <motion.button
      onClick={() => window.print()}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="no-print flex items-center gap-2 px-5 py-3 rounded-sm"
      style={{
        border:        "1px solid #c8a96e",
        color:         "#c8a96e",
        background:    "transparent",
        fontFamily:    "var(--font-playfair), serif",
        fontSize:      "12px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      <FileText className="w-4 h-4" />
      <span>Imprimir</span>
    </motion.button>
  );
}
