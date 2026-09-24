"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, FileText } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Exporta las etiquetas como ventana de impresión
   Formato: hoja A4 con múltiples etiquetas por página
   ───────────────────────────────────────────────────────────── */

const COLOR: Record<string, string> = {
  clasica: "#c4622d",
  premium: "#3d7a72",
  evento:  "#9b2d7a",
};

const LABEL_CONFIG = {
  clasica: { headerColor: "#c4622d", tagline: "Bar & Restaurant",  subtitle: "Agua de la Casa",   bg: "#f5edd8" },
  premium: { headerColor: "#3d7a72", tagline: "Selección Premium", subtitle: "Agua Mineral",       bg: "#f0ede4" },
  evento:  { headerColor: "#9b2d7a", tagline: "Edición Especial",  subtitle: "Evento Tinkubar",    bg: "#f5edd8" },
};

type Variant = keyof typeof LABEL_CONFIG;

async function buildPrintHTML(variants: Variant[], copiesEach: number): Promise<string> {
  /* ── Logo como data-URI ─────────────────────────────────── */
  let logoDataURI = "";
  try {
    const res  = await fetch("/logo-tinku.svg");
    const text = await res.text();
    logoDataURI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(text)}`;
  } catch {
    logoDataURI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#c8a96e" stroke-width="2"/>
        <text x="50" y="58" text-anchor="middle" font-size="22" fill="#c8a96e" font-family="serif">T</text>
      </svg>`
    )}`;
  }

  /* ── Patrón andino ──────────────────────────────────────── */
  const andeanPattern = (bg: string) =>
    `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'>
        <rect width='20' height='20' fill='${bg}'/>
        <path d='M0 10h5v-5h5v5h5v-5h5' stroke='%23c8a96e' stroke-width='0.4' fill='none' opacity='0.2'/>
      </svg>`
    )}`;

  /* ── Genera HTML de una etiqueta ────────────────────────── */
  const etiquetaHTML = (v: Variant) => {
    const c = LABEL_CONFIG[v];
    return `
      <div class="etiqueta">
        <!-- Franja izquierda -->
        <div class="franja" style="background-color:${c.headerColor} !important;">
          <span class="franja-text">TINKUBAR</span>
        </div>

        <!-- Logo oval -->
        <div class="logo-col">
          <div class="logo-oval">
            <img src="${logoDataURI}" alt="Tinku" />
          </div>
        </div>

        <!-- Centro -->
        <div class="centro">
          <div class="deco-line">
            <div class="line-h"></div>
            <span class="star">✦</span>
            <div class="line-h"></div>
          </div>
          <div class="nombre">TINKU</div>
          <div class="subtitulo" style="color:${c.headerColor} !important;">${c.subtitle}</div>
          <div class="tagline">${c.tagline} · tinkubar.cl</div>
          <div class="deco-line">
            <div class="line-h"></div>
            <span class="star">✦</span>
            <div class="line-h"></div>
          </div>
        </div>

        <!-- Franja info derecha -->
        <div class="info-col">
          <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
            <path d="M0 7h4v-3h4v3h4v-3h4v3h4v-3h4v3h4" stroke="#c8a96e" stroke-width="0.7" opacity="0.6"/>
          </svg>
          <span class="vol">330 cc</span>
          <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
            <path d="M0 7h4v-3h4v3h4v-3h4v3h4v-3h4v3h4" stroke="#c8a96e" stroke-width="0.7" opacity="0.6"/>
          </svg>
        </div>

        <!-- Franja derecha -->
        <div class="franja" style="background-color:${c.headerColor} !important;">
          <span class="franja-text" style="transform:rotate(0deg)">TINKUBAR</span>
        </div>
      </div>`;
  };

  /* ── Todas las etiquetas ────────────────────────────────── */
  const allLabels = variants.flatMap((v) =>
    Array.from({ length: copiesEach }, () => etiquetaHTML(v))
  ).join("\n");

  /* ── HTML completo ──────────────────────────────────────── */
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Etiquetas Tinkubar — Botella 330cc</title>
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

    body {
      background: #1a1208;
      font-family: 'Playfair Display', Georgia, serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* ── Barra superior ── */
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

    /* ── Grid de etiquetas ── */
    .grid-etiquetas {
      display: flex;
      flex-direction: column;
      gap: 8mm;
      padding: 4mm 0;
      align-items: center;
    }

    /* ── Etiqueta individual: 21cm × 3.5cm ── */
    .etiqueta {
      width: 21cm;
      height: 3.5cm;
      display: flex;
      align-items: stretch;
      overflow: hidden;
      clip-path: polygon(0% 10%, 1.5% 0%, 98.5% 0%, 100% 10%, 100% 90%, 98.5% 100%, 1.5% 100%, 0% 90%);
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Franjas laterales de color */
    .franja {
      width: 1.2cm;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    .franja-text {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      font-family: 'Playfair Display', serif;
      font-size: 7px; font-weight: 700;
      letter-spacing: 3px; color: #fff;
      text-transform: uppercase; white-space: nowrap;
    }

    /* Logo */
    .logo-col {
      width: 2.8cm; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      padding: 4px 6px;
      border-right: 0.5px solid #c8a96e;
      background-color: inherit;
    }
    .logo-oval {
      width: 2.2cm; height: 2.2cm;
      border-radius: 50%;
      border: 1.5px solid #c8a96e;
      overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      background-color: #f5edd8 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .logo-oval img { width: 1.8cm; height: 1.8cm; object-fit: contain; }

    /* Centro */
    .centro {
      flex: 1;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 4px 10px; gap: 2px;
    }
    .deco-line {
      display: flex; align-items: center; gap: 6px; width: 100%;
    }
    .line-h { flex: 1; height: 0.5px; background: #c8a96e; opacity: 0.6; }
    .star { color: #c8a96e; font-size: 8px; }
    .nombre {
      font-family: 'Playfair Display', serif;
      font-size: 20px; font-weight: 700;
      letter-spacing: 7px; color: #2c1810;
      text-transform: uppercase; line-height: 1;
    }
    .subtitulo {
      font-family: 'Playfair Display', serif;
      font-size: 8px; letter-spacing: 2.5px;
      text-transform: uppercase; font-weight: 600;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .tagline {
      font-family: Georgia, serif;
      font-size: 7px; font-style: italic;
      color: #7a6a50; letter-spacing: 1px;
    }

    /* Info col */
    .info-col {
      width: 2.8cm; flex-shrink: 0;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 4px 6px; gap: 3px;
      border-left: 0.5px solid #c8a96e;
    }
    .vol {
      font-family: 'Playfair Display', serif;
      font-size: 7px; color: #7a6a50; letter-spacing: 1px;
    }

    /* ── PRINT ── */
    @media print {
      body { background: white !important; }
      .print-bar, .spacer { display: none !important; }
      .grid-etiquetas { padding: 0; gap: 6mm; }
      .etiqueta {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      .franja {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <div>
      <div class="print-bar-title">ETIQUETAS TINKUBAR — 330cc</div>
      <div class="print-bar-hint">Destino: "Guardar como PDF" · Márgenes: Mínimos · ✅ Activar "Gráficos de fondo"</div>
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
   Botón exportar etiquetas
   ───────────────────────────────────────────────────────────── */
interface ExportEtiquetasProps {
  variants?: Variant[];
  copiesEach?: number;
}

export default function ExportEtiquetas({
  variants = ["clasica", "premium", "evento"],
  copiesEach = 3,
}: ExportEtiquetasProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const html = await buildPrintHTML(variants, copiesEach);
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
          <span>Exportar Etiquetas PDF</span>
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
