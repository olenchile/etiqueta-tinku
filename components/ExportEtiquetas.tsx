"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, FileText } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Exporta etiquetas ovales con la imagen original como data-URI
   Formato: hoja A4 con etiquetas centradas
   ───────────────────────────────────────────────────────────── */

async function buildPrintHTML(drinks: string[], copiesEach: number): Promise<string> {
  /* ── Imagen etiqueta como data-URI (base64) ─────────────── */
  let imgDataURI = "";
  try {
    const res    = await fetch("/etiqueta-ref.jpeg");
    const blob   = await res.blob();
    imgDataURI   = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    imgDataURI = "/etiqueta-ref.jpeg";
  }

  /* ── Genera HTML de una etiqueta oval ───────────────────── */
  const etiquetaHTML = () => `
    <div class="etiqueta-wrap">
      <div class="etiqueta">
        <img src="${imgDataURI}" alt="Etiqueta Tinkubar" class="etiqueta-img" />
      </div>
    </div>`;

  /* ── Todas las etiquetas ────────────────────────────────── */
  const allLabels = drinks.flatMap(() =>
    Array.from({ length: copiesEach }, () => etiquetaHTML())
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

    /* Grid de etiquetas — 2 por fila en A4 */
    .grid-etiquetas {
      display: flex;
      flex-wrap: wrap;
      gap: 8mm;
      padding: 4mm;
      justify-content: center;
      align-items: flex-start;
    }

    /* Wrapper */
    .etiqueta-wrap {
      display: inline-block;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Etiqueta oval: 7cm × 10cm */
    .etiqueta {
      position: relative;
      width: 7cm;
      height: 10cm;
      border-radius: 50%;
      overflow: hidden;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    /* Imagen original sin modificar, centrada y cubriendo el oval */
    .etiqueta-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      display: block;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* PRINT */
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
      <div class="print-bar-hint">Destino: "Guardar como PDF" · ✅ Activar "Gráficos de fondo" · Márgenes: Mínimos</div>
    </div>
    <button class="btn-print" onclick="window.print()">⬇ Guardar PDF</button>
  </div>
  <div class="spacer"></div>

  <div class="grid-etiquetas">
    ${allLabels}
  </div>

  <script>
    document.fonts.ready.then(function() {
      setTimeout(function() { window.print(); }, 800);
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
