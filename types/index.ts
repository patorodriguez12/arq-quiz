export interface Opcion {
  id: string;
  texto: string;
  explicacion: string;
}

export interface Pregunta {
  id: number;
  autoevaluacion: number;
  unidad: number;
  pregunta: string;
  opciones: Opcion[];
  respuesta_correcta: string;
}

export interface ConfigSesion {
  cantidad: number;
  autoevaluacion: 1 | 2 | 3; // 3 = ambas
  orden: "aleatorio" | "orden";
}

export interface RespuestaUsuario {
  preguntaId: number;
  opcionElegida: string;
  correcta: boolean;
}
