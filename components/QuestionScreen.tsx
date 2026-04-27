"use client";

import { useState } from "react";
import { Pregunta } from "@/types";

interface Props {
  pregunta: Pregunta;
  numero: number;
  total: number;
  onNext: (opcionElegida: string, correcta: boolean) => void;
}

type Estado = "sin_responder" | "correcta" | "incorrecta";

export default function QuestionScreen({
  pregunta,
  numero,
  total,
  onNext,
}: Props) {
  const [seleccionada, setSeleccionada] = useState<string | null>(null);
  const [estado, setEstado] = useState<Estado>("sin_responder");
  const [verRespuesta, setVerRespuesta] = useState(false);

  const handleSelect = (opcionId: string) => {
    if (estado !== "sin_responder") return;
    setSeleccionada(opcionId);
    const esCorrecta = opcionId === pregunta.respuesta_correcta;
    setEstado(esCorrecta ? "correcta" : "incorrecta");
  };

  const handleNext = () => {
    onNext(seleccionada!, estado === "correcta");
    setSeleccionada(null);
    setEstado("sin_responder");
    setVerRespuesta(false);
  };

  const opcionCorrecta = pregunta.opciones.find(
    (o) => o.id === pregunta.respuesta_correcta,
  );
  const opcionSeleccionada = pregunta.opciones.find(
    (o) => o.id === seleccionada,
  );

  const progreso = Math.round((numero / total) * 100);

  return (
    <div className="min-h-screen bg-[#F5F0E8] px-6 py-12">
      <div className="w-full max-w-2xl mx-auto">
        {/* Barra de progreso y contador */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-xs tracking-widest text-[#9B8B7A] uppercase">
              Unidad {pregunta.unidad}
            </span>
            <span className="font-mono text-xs text-[#9B8B7A] tabular-nums">
              {numero} / {total}
            </span>
          </div>
          <div className="h-px bg-[#C4B89A]">
            <div
              className="h-px bg-[#1A1612] transition-all duration-500"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        {/* Pregunta */}
        <div className="mb-10">
          <p className="font-mono text-xs tracking-widest text-[#9B8B7A] uppercase mb-5">
            Pregunta {numero}
          </p>
          <h2 className="font-serif text-2xl text-[#1A1612] leading-relaxed">
            {pregunta.pregunta}
          </h2>
        </div>

        {/* Opciones */}
        <div className="space-y-2 mb-8">
          {pregunta.opciones.map((opcion) => {
            const esSeleccionada = seleccionada === opcion.id;
            const esCorrecta = opcion.id === pregunta.respuesta_correcta;
            const respondida = estado !== "sin_responder";

            let clases =
              "w-full text-left px-5 py-4 border font-mono text-sm transition-colors flex gap-4 items-start ";

            if (!respondida) {
              clases +=
                "border-[#C4B89A] text-[#1A1612] hover:border-[#1A1612] bg-transparent";
            } else if (esCorrecta) {
              clases += "border-[#2D5A27] bg-[#EEF5ED] text-[#2D5A27]";
            } else if (esSeleccionada && !esCorrecta) {
              clases += "border-[#7A2020] bg-[#F5EDED] text-[#7A2020]";
            } else {
              clases +=
                "border-[#C4B89A] text-[#9B8B7A] bg-transparent opacity-50";
            }

            return (
              <button
                key={opcion.id}
                onClick={() => handleSelect(opcion.id)}
                disabled={respondida}
                className={clases}
              >
                <span className="shrink-0 uppercase tracking-widest text-xs mt-0.5 opacity-60">
                  {opcion.id}.
                </span>
                <span className="leading-relaxed">{opcion.texto}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {estado !== "sin_responder" && (
          <div className="mb-8 space-y-4">
            <div className="h-px bg-[#C4B89A]" />

            {/* Resultado */}
            <p
              className={`font-mono text-xs tracking-widest uppercase ${
                estado === "correcta" ? "text-[#2D5A27]" : "text-[#7A2020]"
              }`}
            >
              {estado === "correcta" ? "✓ Correcto" : "✗ Incorrecto"}
            </p>

            {/* Explicación de la opción elegida */}
            <p className="font-serif text-base text-[#4A3F35] leading-relaxed">
              {opcionSeleccionada?.explicacion}
            </p>

            {/* Ver respuesta correcta (solo si falló) */}
            {estado === "incorrecta" && (
              <div>
                {!verRespuesta ? (
                  <button
                    onClick={() => setVerRespuesta(true)}
                    className="font-mono text-xs tracking-widest uppercase text-[#9B8B7A] underline underline-offset-4 hover:text-[#1A1612] transition-colors"
                  >
                    Ver respuesta correcta
                  </button>
                ) : (
                  <div className="border-l-2 border-[#2D5A27] pl-4">
                    <p className="font-mono text-xs tracking-widest uppercase text-[#2D5A27] mb-2">
                      Respuesta correcta — opción{" "}
                      {pregunta.respuesta_correcta.toUpperCase()}
                    </p>
                    <p className="font-serif text-base text-[#4A3F35] leading-relaxed">
                      {opcionCorrecta?.explicacion}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Botón siguiente */}
        {estado !== "sin_responder" && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-[#1A1612] text-[#F5F0E8] font-mono text-xs tracking-widest uppercase hover:bg-[#2C2419] transition-colors"
          >
            {numero === total ? "Ver resultados" : "Siguiente →"}
          </button>
        )}
      </div>
    </div>
  );
}
