"use client";

import { RespuestaUsuario } from "@/types";

interface Props {
  correctas: number;
  total: number;
  respuestas: RespuestaUsuario[];
  onReintentar: () => void;
}

export default function ResultScreen({
  correctas,
  total,
  onReintentar,
}: Props) {
  const porcentaje = Math.round((correctas / total) * 100);

  const mensaje = () => {
    if (porcentaje >= 90) return "Excelente dominio del tema.";
    if (porcentaje >= 70) return "Buen nivel, seguí practicando.";
    if (porcentaje >= 50) return "Hay margen para mejorar.";
    return "Repasá los temas y volvé a intentarlo.";
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-widest text-[#9B8B7A] uppercase mb-3">
            Resultado
          </p>
          <div className="h-px bg-[#1A1612] mb-8" />

          {/* Puntaje grande */}
          <div className="flex items-end gap-4 mb-6">
            <span className="font-serif text-8xl text-[#1A1612] leading-none tabular-nums">
              {correctas}
            </span>
            <div className="pb-3">
              <span className="font-mono text-sm text-[#9B8B7A]">
                / {total} correctas
              </span>
            </div>
          </div>

          {/* Barra de porcentaje */}
          <div className="mb-4">
            <div className="h-1 bg-[#C4B89A] w-full">
              <div
                className="h-1 bg-[#1A1612] transition-all duration-700"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
          </div>

          <p className="font-mono text-xs tracking-widest text-[#9B8B7A] uppercase">
            {porcentaje}% — {mensaje()}
          </p>
        </div>

        {/* Desglose simple */}
        <div className="mb-16 space-y-3">
          <div className="flex justify-between font-mono text-xs tracking-wider text-[#9B8B7A] uppercase border-b border-[#C4B89A] pb-2">
            <span>Correctas</span>
            <span className="text-[#2D5A27]">{correctas}</span>
          </div>
          <div className="flex justify-between font-mono text-xs tracking-wider text-[#9B8B7A] uppercase border-b border-[#C4B89A] pb-2">
            <span>Incorrectas</span>
            <span className="text-[#7A2020]">{total - correctas}</span>
          </div>
          <div className="flex justify-between font-mono text-xs tracking-wider text-[#9B8B7A] uppercase pb-2">
            <span>Total</span>
            <span className="text-[#1A1612]">{total}</span>
          </div>
        </div>

        {/* Botones */}
        <div className="space-y-3">
          <button
            onClick={onReintentar}
            className="w-full py-4 bg-[#1A1612] text-[#F5F0E8] font-mono text-xs tracking-widest uppercase hover:bg-[#2C2419] transition-colors"
          >
            Volver a empezar
          </button>
        </div>
      </div>
    </div>
  );
}
