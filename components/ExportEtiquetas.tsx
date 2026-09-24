"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, FileText } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Exporta etiquetas con etiqueta_2.jpeg (imagen limpia)
   + overlay tipográfico IM Fell English
   + logo SVG oficial Tinku como data-URI
   ───────────────────────────────────────────────────────────── */

async function toDataURI(url: string): Promise<string> {
  try {
    const res  = await fetch(url);
    const blob = await res.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror   = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return url;
  }
}

async function buildPrintHTML(drinks: string[], copiesEach: number): Promise<string> {
  /* ── Convertir imagen y logo a data-URI para blob ── */
  const [imgDataURI, logoDataURI] = await Promise.all([
    toDataURI("/etiqueta-ref.jpeg"),
    toDataURI("/logo-tinku.svg"),
  ]);

  /* ── HTML de una etiqueta ── */
  const etiquetaHTML = (drink: string) => {
    const id = drink.replace(/\s+/g, "_");
    return `
    <div class="etiqueta-wrap">
      <div class="etiqueta">

        <!-- Imagen base: ilustración acuarela del limón -->
        <img src="${imgDataURI}" alt="Etiqueta" class="etiqueta-img" />

        <!-- Overlay superior: "PISCO SOUR" curvo con IM Fell English -->
        <div class="overlay-top">
          <svg viewBox="0 0 220 80" class="svg-label" overflow="visible">
            <defs>
              <path id="arc_${id}" d="M 20,68 A 90,90 0 0,1 200,68"/>
              <filter id="halo_${id}" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="0.5" stdDeviation="0.8"
                  flood-color="rgba(255,255,255,0.9)" flood-opacity="1"/>
              </filter>
              <filter id="glow_${id}" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5"
                  flood-color="rgba(0,0,0,0.2)" flood-opacity="1"/>
              </filter>
            </defs>
            <!-- Halo blanco para legibilidad -->
            <text font-family="'IM Fell English', 'Playfair Display', 'Times New Roman', Georgia, serif"
              font-size="22" font-weight="400" font-style="italic"
              fill="rgba(255,255,255,0.85)" letter-spacing="1.5"
              filter="url(#halo_${id})"
              stroke="rgba(255,255,255,0.7)" stroke-width="4" paint-order="stroke">
              <textPath href="#arc_${id}" startOffset="50%" text-anchor="middle">${drink}</textPath>
            </text>
            <!-- Texto principal oscuro -->
            <text font-family="'IM Fell English', 'Playfair Display', 'Times New Roman', Georgia, serif"
              font-size="22" font-weight="400" font-style="italic"
              fill="#1c2340" letter-spacing="1.5"
              filter="url(#glow_${id})">
              <textPath href="#arc_${id}" startOffset="50%" text-anchor="middle">${drink}</textPath>
            </text>
          </svg>
        </div>

        <!-- Overlay inferior: logo Tinku + nombre -->
        <div class="overlay-bottom">
          <img src="${logoDataURI}" alt="Logo Tinku" class="logo-img" />
          <div class="footer-text">
            <div class="footer-restobar">Restobar</div>
            <div class="footer-tinku">TINKU</div>
          </div>
        </div>

      </div>
    </div>`;
  };

  const allLabels = drinks
    .flatMap((d) => Array.from({ length: copiesEach }, () => etiquetaHTML(d)))
    .join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Etiquetas Tinkubar</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"/>
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
      font-family: 'IM Fell English', 'Playfair Display', Georgia, serif;
    }

    /* ── Barra de impresión ── */
    .print-bar {
      position: fixed; top: 0; left: 0; right: 0;
      background: rgba(26,18,8,0.97);
      border-bottom: 1px solid rgba(200,169,110,0.35);
      padding: 10px 20px;
      display: flex; align-items: center; justify-content: space-between;
      z-index: 9999;
    }
    .print-bar-title {
      font-size: 14px; font-weight: 700;
      letter-spacing: 4px; color: #d4a017;
    }
    .print-bar-hint { font-size: 10px; color: #8a7a5a; margin-top: 2px; }
    .btn-print {
      background: linear-gradient(135deg, #c4622d, #a8501e) !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color: #fff; border: none; cursor: pointer;
      padding: 10px 24px; border-radius: 2px;
      font-family: 'IM Fell English', serif;
      font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
    }
    .spacer { height: 60px; }

    /* ── Grid de etiquetas ── */
    .grid-etiquetas {
      display: flex; flex-wrap: wrap;
      gap: 8mm; padding: 4mm;
      justify-content: center; align-items: flex-start;
    }
    .etiqueta-wrap {
      display: inline-block;
      page-break-inside: avoid; break-inside: avoid;
    }

    /* ── Etiqueta oval 7cm × 10cm ── */
    .etiqueta {
      position: relative;
      width: 7cm; height: 10cm;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Imagen base */
    .etiqueta-img {
      position: absolute; inset: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      object-position: center 22%;
      display: block;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Overlay superior — zona libre para texto */
    .overlay-top {
      position: absolute; top: 0; left: 0; right: 0;
      height: 24%;
      display: flex; align-items: center; justify-content: center;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .svg-label { width: 88%; height: auto; }

    /* Overlay inferior — zona sobre mancha azul */
    .overlay-bottom {
      position: absolute; bottom: 0; left: 0; right: 0;
      height: 30%;
      display: flex; flex-direction: column;
      align-items: center; justify-content: flex-end;
      padding-bottom: 7%;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Logo SVG oficial Tinku */
    .logo-img {
      width: 2.8cm; height: auto; max-height: 1.4cm;
      object-fit: contain;
      margin-bottom: 3px;
      filter: brightness(0) invert(0) sepia(1) saturate(0) brightness(0.15);
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Texto del footer */
    .footer-text { text-align: center; line-height: 1.1; }
    .footer-restobar {
      font-family: 'IM Fell English', serif;
      font-size: 7.5px; font-style: italic;
      color: #2a3050; letter-spacing: 3.5px; text-transform: uppercase;
      text-shadow: 0 0 6px rgba(255,255,255,0.8);
    }
    .footer-tinku {
      font-family: 'IM Fell English', serif;
      font-size: 15px; font-weight: 400;
      color: #1a2040; letter-spacing: 6px; text-transform: uppercase;
      line-height: 1;
      text-shadow: 0 0 8px rgba(255,255,255,0.9), 0 1px 3px rgba(0,0,0,0.2);
    }

    @media print {
      body { background: white !important; }
      .print-bar, .spacer { display: none !important; }
      .etiqueta {
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
