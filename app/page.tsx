"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EtiquetaBottle from "@/components/EtiquetaBottle";
import ExportEtiquetas, { PrintButton } from "@/components/ExportEtiquetas";

const DRINKS = [
  { key: "PISCO SOUR",      color: "#c4622d" },
  { key: "AGUA MINERAL",    color: "#3d7a72" },
  { key: "LIMONADA",        color: "#b8860b" },
  { key: "VINO TINTO",      color: "#9b2d7a" },
];

export default function Home() {
  const [copies, setCopies]   = useState(3);
  const [selected, setSelected] = useState<string[]>(["PISCO SOUR"]);

  const toggleDrink = (d: string) =>
    setSelected((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );

  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #1a1208 0%, #2a2015 50%, #1a1208 100%)" }}
    >
      {/* ── HEADER ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="no-print sticky top-0 z-50 px-6 py-3 flex items-center justify-between"
        style={{
          background:     "rgba(26,18,8,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom:   "1px solid rgba(200,169,110,0.2)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden p-1"
            style={{ border: "1px solid #c8a96e", background: "rgba(255,255,255,0.05)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-tinku.svg"
              alt="Tinkubar"
              style={{
                width: "100%", height: "100%", objectFit: "contain",
                filter: "brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg)",
              }}
            />
          </div>
          <div>
            <span
              className="font-bold tracking-widest"
              style={{ color: "#d4a017", fontSize: "16px", fontFamily: "var(--font-playfair), serif" }}
            >
              TINKUBAR
            </span>
            <span
              className="italic ml-2"
              style={{ color: "#8a7a5a", fontSize: "11px", fontFamily: "var(--font-cormorant), serif" }}
            >
              Etiquetas Botella
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PrintButton />
          <ExportEtiquetas drinks={selected} copiesEach={copies} />
        </div>
      </motion.header>

      {/* ── TÍTULO ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="no-print text-center py-10 px-4"
      >
        <h1
          className="font-bold tracking-[0.2em] uppercase mb-2"
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(24px, 4vw, 42px)",
            background: "linear-gradient(135deg, #b8860b 0%, #f0d060 40%, #b8860b 60%, #8b6508 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmerGold 4s linear infinite",
          }}
        >
          Etiquetas Botella
        </h1>
        <p style={{
          color: "#c8a96e", fontSize: "16px",
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic", letterSpacing: "0.15em",
        }}>
          Diseño oval · Ilustración limón acuarela · Restobar Tinku
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div style={{ flex: 1, maxWidth: "120px", height: "0.5px", background: "linear-gradient(to right, transparent, #c8a96e)" }} />
          <span style={{ color: "#c8a96e", fontSize: "12px" }}>✦</span>
          <div style={{ flex: 1, maxWidth: "120px", height: "0.5px", background: "linear-gradient(to left, transparent, #c8a96e)" }} />
        </div>
      </motion.div>

      {/* ── CONTROLES ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="no-print flex flex-wrap items-center justify-center gap-6 px-6 pb-8"
      >
        {/* Selector de bebidas */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span style={{
            color: "#8a7a5a", fontSize: "11px", letterSpacing: "2px",
            fontFamily: "var(--font-playfair), serif", textTransform: "uppercase",
          }}>
            Bebida:
          </span>
          {DRINKS.map((d) => (
            <button
              key={d.key}
              onClick={() => toggleDrink(d.key)}
              style={{
                padding: "6px 14px", borderRadius: "2px",
                border: `1px solid ${d.color}`,
                background: selected.includes(d.key) ? d.color : "transparent",
                color: selected.includes(d.key) ? "#fff" : d.color,
                fontFamily: "var(--font-playfair), serif",
                fontSize: "11px", letterSpacing: "1.5px",
                textTransform: "uppercase", cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {d.key}
            </button>
          ))}
        </div>

        {/* Copias */}
        <div className="flex items-center gap-3">
          <span style={{
            color: "#8a7a5a", fontSize: "11px", letterSpacing: "2px",
            fontFamily: "var(--font-playfair), serif", textTransform: "uppercase",
          }}>
            Copias:
          </span>
          {[1, 2, 3, 5, 8].map((n) => (
            <button
              key={n}
              onClick={() => setCopies(n)}
              style={{
                width: "32px", height: "32px", borderRadius: "2px",
                border: "1px solid #c8a96e",
                background: copies === n ? "#c8a96e" : "transparent",
                color: copies === n ? "#1a1208" : "#c8a96e",
                fontFamily: "var(--font-playfair), serif",
                fontSize: "12px", cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── PREVIEW DE ETIQUETAS ── */}
      <div className="px-4 pb-16">
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          justifyContent: "center",
        }}>
          {selected.map((drink, i) => (
            <motion.div
              key={drink}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
            >
              <span style={{
                color: "#8a7a5a", fontSize: "10px", letterSpacing: "2px",
                fontFamily: "var(--font-playfair), serif", textTransform: "uppercase",
              }}>
                {drink}
              </span>
              <EtiquetaBottle drink={drink} showCutLines />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── INFO TÉCNICA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="no-print text-center py-8 px-4"
        style={{ borderTop: "1px solid rgba(200,169,110,0.15)" }}
      >
        <p style={{
          color: "#6a5a3a", fontSize: "11px",
          fontFamily: "var(--font-playfair), serif",
          letterSpacing: "1px", lineHeight: "1.8",
        }}>
          Formato oval: 7cm × 10cm · Troquel: borde oval<br/>
          Imprimir en papel adhesivo mate · Activar "Gráficos de fondo" al exportar PDF
        </p>
      </motion.div>
    </main>
  );
}
