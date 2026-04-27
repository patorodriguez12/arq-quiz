"use client";

import { useState, useMemo } from "react";
import preguntasRaw from "@/data/preguntas.json";
import { Pregunta, ConfigSesion, RespuestaUsuario } from "@/types";
import ConfigScreen from "@/components/ConfigScreen";
import QuestionScreen from "@/components/QuestionScreen";
import ResultScreen from "@/components/ResultScreen";

const todasLasPreguntas: Pregunta[] = preguntasRaw as Pregunta[];

type Pantalla = "config" | "pregunta" | "resultado";

export default function Home() {
  const [pantalla, setPantalla] = useState<Pantalla>("config");
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<RespuestaUsuario[]>([]);
  const [preguntasSesion, setPreguntasSesion] = useState<Pregunta[]>([]);

  const totalDisponibles = useMemo(() => todasLasPreguntas.length, []);

  const handleStart = (cfg: ConfigSesion) => {
    let pool =
      cfg.autoevaluacion === 3
        ? todasLasPreguntas
        : todasLasPreguntas.filter(
            (p) => p.autoevaluacion === cfg.autoevaluacion,
          );

    if (cfg.orden === "aleatorio") {
      pool = [...pool].sort(() => Math.random() - 0.5);
    }

    const seleccionadas = pool.slice(0, Math.min(cfg.cantidad, pool.length));

    setPreguntasSesion(seleccionadas);
    setPreguntaActual(0);
    setRespuestas([]);
    setPantalla("pregunta");
  };

  const handleNext = (opcionElegida: string, correcta: boolean) => {
    const nuevaRespuesta: RespuestaUsuario = {
      preguntaId: preguntasSesion[preguntaActual].id,
      opcionElegida,
      correcta,
    };

    const nuevasRespuestas = [...respuestas, nuevaRespuesta];
    setRespuestas(nuevasRespuestas);

    if (preguntaActual + 1 >= preguntasSesion.length) {
      setPantalla("resultado");
    } else {
      setPreguntaActual((prev) => prev + 1);
    }
  };

  const handleReintentar = () => {
    setPantalla("config");
    setPreguntaActual(0);
    setRespuestas([]);
    setPreguntasSesion([]);
  };

  const correctas = respuestas.filter((r) => r.correcta).length;

  if (pantalla === "config") {
    return (
      <ConfigScreen totalPreguntas={totalDisponibles} onStart={handleStart} />
    );
  }

  if (pantalla === "pregunta" && preguntasSesion.length > 0) {
    return (
      <QuestionScreen
        pregunta={preguntasSesion[preguntaActual]}
        numero={preguntaActual + 1}
        total={preguntasSesion.length}
        onNext={handleNext}
      />
    );
  }

  if (pantalla === "resultado") {
    return (
      <ResultScreen
        correctas={correctas}
        total={preguntasSesion.length}
        respuestas={respuestas}
        onReintentar={handleReintentar}
      />
    );
  }

  return null;
}
