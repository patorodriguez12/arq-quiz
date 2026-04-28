"use client";

import { useState } from "react";
import { ConfigSesion } from "@/types";

interface Props {
  totalPreguntas: number;
  onStart: (config: ConfigSesion) => void;
}

export default function ConfigScreen({ totalPreguntas, onStart }: Props) {
  const [cantidad, setCantidad] = useState(10);
  const [autoevaluacion, setAutoevaluacion] = useState<1 | 2 | 3>(3);
  const [orden, setOrden] = useState<"aleatorio" | "orden">("aleatorio");

  const maxPreguntas = autoevaluacion === 3 ? totalPreguntas : 25;

  const handleAutoevaluacion = (val: 1 | 2 | 3) => {
    setAutoevaluacion(val);
    const nuevoMax = val === 3 ? totalPreguntas : 25;
    if (cantidad > nuevoMax) setCantidad(nuevoMax);
  };

  const handleStart = () => {
    onStart({ cantidad, autoevaluacion, orden });
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-widest text-[#9B8B7A] uppercase mb-3">
            Arquitectura y Sistemas Operativos
          </p>
          <h1 className="font-serif text-5xl text-[#1A1612] leading-tight">
            Quiz de repaso
          </h1>
          <div className="mt-4 h-px bg-[#1A1612]" />
        </div>

        {/* Formulario */}
        <div className="space-y-10">
          {/* Selector de cantidad */}
          <div>
            <label className="block font-mono text-xs tracking-widest text-[#9B8B7A] uppercase mb-4">
              Cantidad de preguntas
            </label>
            <div className="flex items-center gap-6">
              <input
                type="range"
                min={5}
                max={maxPreguntas}
                step={5}
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                className="flex-1 accent-[#1A1612] h-px cursor-pointer"
              />
              <span className="font-mono text-2xl text-[#1A1612] w-8 text-right tabular-nums">
                {cantidad}
              </span>
            </div>
          </div>

          {/* Selector de unidades */}
          <div>
            <label className="block font-mono text-xs tracking-widest text-[#9B8B7A] uppercase mb-4">
              Unidades
            </label>
            <div className="flex gap-2">
              {[
                { value: 1, label: "Autoevaluacion 1 (Unidades 1, 2 y 3)" },
                { value: 2, label: "Autoevaluacion 2 (Unidades 4 y 5)" },
                { value: 3, label: "Ambas" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAutoevaluacion(opt.value as 1 | 2 | 3)}
                  className={`flex-1 p-2 py-3 font-mono text-xs tracking-widest uppercase border cursor-pointer transition-colors ${
                    autoevaluacion === opt.value
                      ? "bg-[#1A1612] text-[#F5F0E8] border-[#1A1612]"
                      : "bg-transparent text-[#1A1612] border-[#C4B89A] hover:border-[#1A1612]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Selector de orden */}
          <div>
            <label className="block font-mono text-xs tracking-widest text-[#9B8B7A] uppercase mb-4">
              Orden
            </label>
            <div className="flex gap-2">
              {[
                { value: "aleatorio", label: "Aleatorio" },
                { value: "orden", label: "En orden" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setOrden(opt.value as "aleatorio" | "orden")}
                  className={`flex-1 py-3 font-mono text-xs tracking-widest cursor-pointer uppercase border transition-colors ${
                    orden === opt.value
                      ? "bg-[#1A1612] text-[#F5F0E8] border-[#1A1612]"
                      : "bg-transparent text-[#1A1612] border-[#C4B89A] hover:border-[#1A1612]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Start */}
        <div className="mt-16">
          <button
            onClick={handleStart}
            className="w-full py-4 bg-[#1A1612] text-[#F5F0E8] font-mono text-xs tracking-widest cursor-pointer uppercase hover:bg-[#2C2419] transition-colors"
          >
            Comenzar
          </button>
        </div>

        {/* Firma Desarrollador */}
        <div className="mt-16">
          <p className="font-mono text-xs ">
            Desarrollado por{" "}
            <a href="https://github.com/patorodriguez12" target="_blank">
              Hugo Patricio Rodriguez
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
