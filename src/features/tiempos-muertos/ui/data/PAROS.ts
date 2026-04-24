import type { ParoTipo } from "../components/CardParo";

/**
 * Estructura de un paro de ejemplo para UI local.
 */
export interface ParoMock {
  id: string;
  maquina: string;
  motivo: string;
  tipo: ParoTipo;
  /**
   * Fecha de inicio en epoch ms.
   */
  inicioEpoch: number;
}

/**
 * Devuelve un epoch en milisegundos restando minutos al momento actual.
 */
const minutesAgo = (minutes: number): number => Date.now() - minutes * 60_000;

/**
 * Datos de ejemplo para visualizar tarjetas de paros.
 */
export const PAROS: ReadonlyArray<ParoMock> = [
  {
    id: "M-001",
    maquina: "Automática 6",
    motivo:
      "Falla en el sistema de alimentación principal. Se requiere revisión urgente del módulo.",
    tipo: "falla",
    inicioEpoch: minutesAgo(45),
  },
  {
    id: "M-002",
    maquina: "Prensa Hidráulica 3",
    motivo:
      "Mantenimiento preventivo programado. Cambio de aceite y ajuste de cilindros.",
    tipo: "mantenimiento",
    inicioEpoch: minutesAgo(18),
  },
  {
    id: "M-003",
    maquina: "Cortadora CNC",
    motivo:
      "Sin material en tolva. Esperando reabastecimiento de materia prima.",
    tipo: "material",
    inicioEpoch: minutesAgo(2),
  },
  {
    id: "M-004",
    maquina: "Soldadora Robot",
    motivo: "Revisión de calidad no programada por supervisor de turno.",
    tipo: "otro",
    inicioEpoch: minutesAgo(70),
  },
  {
    id: "M-005",
    maquina: "Inyectora Plástico 2",
    motivo: "Mantenimiento correctivo en resistencias de banda calefactora.",
    tipo: "mantenimiento",
    inicioEpoch: minutesAgo(22),
  },
  {
    id: "M-005",
    maquina: "Inyectora Plástico 2",
    motivo: "Mantenimiento correctivo en resistencias de banda calefactora.",
    tipo: "mantenimiento",
    inicioEpoch: minutesAgo(22),
  },
  {
    id: "M-005",
    maquina: "Inyectora Plástico 2",
    motivo: "Mantenimiento correctivo en resistencias de banda calefactora.",
    tipo: "mantenimiento",
    inicioEpoch: minutesAgo(22),
  },
  {
    id: "M-005",
    maquina: "Inyectora Plástico 2",
    motivo: "Mantenimiento correctivo en resistencias de banda calefactora.",
    tipo: "mantenimiento",
    inicioEpoch: minutesAgo(22),
  },
  {
    id: "M-005",
    maquina: "Inyectora Plástico 2",
    motivo: "Mantenimiento correctivo en resistencias de banda calefactora.",
    tipo: "mantenimiento",
    inicioEpoch: minutesAgo(22),
  },
  {
    id: "M-005",
    maquina: "Inyectora Plástico 2",
    motivo: "Mantenimiento correctivo en resistencias de banda calefactora.",
    tipo: "mantenimiento",
    inicioEpoch: minutesAgo(22),
  },
  {
    id: "M-005",
    maquina: "Inyectora Plástico 2",
    motivo: "Mantenimiento correctivo en resistencias de banda calefactora.",
    tipo: "mantenimiento",
    inicioEpoch: minutesAgo(22),
  },
  {
    id: "M-005",
    maquina: "Inyectora Plástico 2",
    motivo: "Mantenimiento correctivo en resistencias de banda calefactora.",
    tipo: "mantenimiento",
    inicioEpoch: minutesAgo(22),
  },
  {
    id: "M-005",
    maquina: "Inyectora Plástico 2",
    motivo: "Mantenimiento correctivo en resistencias de banda calefactora.",
    tipo: "mantenimiento",
    inicioEpoch: minutesAgo(22),
  },
  {
    id: "M-005",
    maquina: "Inyectora Plástico 2",
    motivo: "Mantenimiento correctivo en resistencias de banda calefactora.",
    tipo: "mantenimiento",
    inicioEpoch: minutesAgo(22),
  },
  {
    id: "M-005",
    maquina: "Inyectora Plástico 2",
    motivo: "Mantenimiento correctivo en resistencias de banda calefactora.",
    tipo: "mantenimiento",
    inicioEpoch: minutesAgo(22),
  },
];
