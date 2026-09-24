"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EtiquetaBottle from "@/components/EtiquetaBottle";
import ExportEtiquetas, { PrintButton } from "@/components/ExportEtiquetas";

type Variant = "clasica" | "premium" | "evento";

const VARIANTS: { key: Variant; label: string; color: string; desc: string }[] = [
  { key: "clasica", label: "Clásica",  color: "#c4622d", desc: "Agua de la Casa · terracota" },
  { key: "premium", label: "Premium",  color: "#3d7a72", desc: "Agua Mineral · teal"         },
  { key: "evento",  label: "Evento",   color: "#9b2d7a", desc: "Edición Especial · magenta"  },
];

export default function Home() {
  const [copies, setCopies] = useState(3);
  const [selected, setSelected] = useState<Variant[]>(["clasica", "premium", "evento"]);

  const toggleVariant = (v: Variant) =>
    setSelected((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
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
          background:    "rgba(26,18,8,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom:  "1px solid rgba(200,169,110,0.2)",
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
              style={{ width: "100%", height: "100%", objectFit: "contain",
                filter: "brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg)" }}
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
              Etiquetas Botella 330cc
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PrintButton />
          <ExportEtiquetas variants={selected} copiesEach={copies} />
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
        <p style={{ color: "#c8a96e", fontSize: "16px", fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic", letterSpacing: "0.15em" }}>
          Puyehue 330cc · Formato 21cm × 3.5cm · Troquel curvo
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div style={{ flex: 1, maxWidth: "120px", height: "0.5px",
            background: "linear-gradient(to right, transparent, #c8a96e)" }} />
          <span style={{ color: "#c8a96e", fontSize: "12px" }}>✦</span>
          <div style={{ flex: 1, maxWidth: "120px", height: "0.5px",
            background: "linear-gradient(to left, transparent, #c8a96e)" }} />
        </div>
      </motion.div>

      {/* ── CONTROLES ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="no-print flex flex-wrap items-center justify-center gap-6 px-6 pb-8"
      >
        {/* Selector de variantes */}
        <div className="flex items-center gap-3">
          <span style={{ color: "#8a7a5a", fontSize: "11px", letterSpacing: "2px",
            fontFamily: "var(--font-playfair), serif", textTransform: "uppercase" }}>
            Variantes:
          </span>
          {VARIANTS.map((v) => (
            <button
              key={v.key}
              onClick={() => toggleVariant(v.key)}
              style={{
                padding: "6px 14px",
                borderRadius: "2px",
                border: `1px solid ${v.color}`,
                background: selected.includes(v.key) ? v.color : "transparent",
                color: selected.includes(v.key) ? "#fff" : v.color,
                fontFamily: "var(--font-playfair), serif",
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Copias por variante */}
        <div className="flex items-center gap-3">
          <span style={{ color: "#8a7a5a", fontSize: "11px", letterSpacing: "2px",
            fontFamily: "var(--font-playfair), serif", textTransform: "uppercase" }}>
            Copias:
          </span>
          {[1, 2, 3, 5, 8].map((n) => (
            <button
              key={n}
              onClick={() => setCopies(n)}
              style={{
                width: "32px", height: "32px",
                borderRadius: "2px",
                border: "1px solid #c8a96e",
                background: copies === n ? "#c8a96e" : "transparent",
                color: copies === n ? "#1a1208" : "#c8a96e",
                fontFamily: "var(--font-playfair), serif",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── PREVIEW DE ETIQUETAS ── */}
      <div className="px-4 pb-16 overflow-x-auto">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            alignItems: "center",
            minWidth: "fit-content",
            margin: "0 auto",
          }}
        >
          {VARIANTS.filter((v) => selected.includes(v.key)).map((v, i) => (
            <motion.div
              key={v.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Label de variante */}
              <div
                className="mb-2 flex items-center gap-3"
                style={{ paddingLeft: "4px" }}
              >
                <div style={{ width: "8px", height: "8px", borderRadius: "50%",
                  background: v.color, flexShrink: 0 }} />
                <span style={{ color: "#8a7a5a", fontSize: "10px", letterSpacing: "2px",
                  fontFamily: "var(--font-playfair), serif", textTransform: "uppercase" }}>
                  {v.label} — {v.desc}
                </span>
              </div>

              {/* Etiqueta */}
              <div
                style={{
                  boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(200,169,110,0.15)",
                  borderRadius: "4px",
                }}
              >
                <EtiquetaBottle variant={v.key} showCutLines />
              </div>
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
        <p style={{ color: "#6a5a3a", fontSize: "11px", fontFamily: "var(--font-playfair), serif",
          letterSpacing: "1px", lineHeight: "1.8" }}>
          Dimensiones: 21cm × 3.5cm · Troquel: arco curvo superior e inferior<br/>
          Zona lisa central botella Puyehue 330cc · Diámetro zona: ~6.5cm<br/>
          Imprimir en papel adhesivo mate o brillante · Activar "Gráficos de fondo" al exportar PDF
        </p>
      </motion.div>
    </main>
  );
}
