export const PAROS = [
  {
    id: "M-001",
    maquina: "Automática 6",
    motivo: "Falla en el sistema de alimentación principal. Se requiere revisión urgente del módulo.",
    tipo: "falla" as const,
    // hace 45 minutos → estado CRÍTICO
    inicioEpoch: Date.now() - 45 * 60 * 1000,
  },
  {
    id: "M-002",
    maquina: "Prensa Hidráulica 3",
    motivo: "Mantenimiento preventivo programado. Cambio de aceite y ajuste de cilindros.",
    tipo: "mantenimiento" as const,
    // hace 18 minutos → estado ADVERTENCIA
    inicioEpoch: Date.now() - 18 * 60 * 1000,
  },
  {
    id: "M-003",
    maquina: "Cortadora CNC",
    motivo: "Sin material en tolva. Esperando reabastecimiento de materia prima.",
    tipo: "material" as const,
    // hace 2 minutos → estado NORMAL
    inicioEpoch: Date.now() - 2 * 60 * 1000,
  },
  {
    id: "M-004",
    maquina: "Soldadora Robot",
    motivo: "Revisión de calidad no programada por supervisor de turno.",
    tipo: "otro" as const,
    // hace 1 hora 10 minutos → estado CRÍTICO
    inicioEpoch: Date.now() - 70 * 60 * 1000,
  },
  {
    id: "M-005",
    maquina: "Inyectora Plástico 2",
    motivo: "Mantenimiento correctivo en resistencias de banda calefactora.",
    tipo: "mantenimiento" as const,
    // hace 22 minutos → estado ADVERTENCIA
    inicioEpoch: Date.now() - 22 * 60 * 1000,
  },
]
