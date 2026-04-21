/**
 * Opción disponible en un filtro de tipo `select`.
 */
export interface FilterOption {
  /** Texto visible para el usuario */
  label: string;
  /** Valor que se envía en el filtro */
  value: string;
}

/**
 * Mapa de valores soportados por cada tipo de filtro.
 * Define el tipo de dato que maneja cada variante de filtro.
 */
export type FilterValueMap = {
  text: string;
  select: string;
  date: string | null;
  dateRange: { start: string | null; end: string | null };
};

/**
 * Base genérica discriminada por `type` para construir filtros tipados.
 *
 * @template TType Tipo de filtro (`text`, `select`, etc.)
 * @template TKeys Llaves válidas del objeto de filtros (ej: "nombre" | "correo")
 */
export type BaseFilter<
  TType extends keyof FilterValueMap,
  TKeys extends string = string
> = {
  /** Tipo de filtro */
  type: TType;

  /**
   * Clave del filtro.
   * Se recomienda tiparla con las keys de tus query params
   * para obtener autocompletado y evitar errores.
   */
  key: TKeys;

  /** Etiqueta visible en la UI */
  label: string;

  /** Valor actual del filtro */
  value: FilterValueMap[TType];

  /**
   * Callback que se ejecuta al cambiar el valor del filtro.
   * Recibe el valor tipado según el tipo de filtro.
   */
  onChange: (value: FilterValueMap[TType]) => void;

  /**
   * Si es `true`, el filtro no podrá eliminarse desde la UI
   * (no muestra botón de eliminar en el badge).
   */
  isNotRemovable?: boolean;

  /**
   * Opciones disponibles (solo aplica para `type: "select"`).
   */
  options?: TType extends "select" ? FilterOption[] : never;
};

/**
 * Conjunto de tipos de filtro disponibles.
 *
 * @template TKeys Llaves válidas del objeto de filtros
 */
export type FilterType<TKeys extends string = string> =
  | BaseFilter<"text", TKeys>
  | BaseFilter<"select", TKeys>
  | BaseFilter<"date", TKeys>
  | BaseFilter<"dateRange", TKeys>;

/**
 * Props del componente `FilterTable`.
 *
 * @template TKeys Llaves válidas de los filtros (ej: "nombre" | "correo")
 */
export interface FilterTableProps<TKeys extends string = string> {
  /**
   * Lista de filtros a renderizar en la toolbar.
   */
  filters: FilterType<TKeys>[];

  /**
   * Se invoca al hacer clic en "Aplicar".
   * Recibe los filtros actuales (draft) para que puedas transformarlos
   * y enviarlos a query params o backend.
   */
  onApply: (draftFilters: FilterType<TKeys>[]) => void;

  /**
   * Se invoca al limpiar todos los filtros.
   */
  onClear: () => void;

  /**
   * Opcional: limpiar la búsqueda global del DataTable
   * cuando se limpian los filtros.
   */
  onClearSearch?: () => void;
}