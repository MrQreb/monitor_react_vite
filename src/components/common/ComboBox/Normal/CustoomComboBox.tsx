import { useId, useMemo, useState, useCallback } from "react"
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

/**
 * Tipos de campo soportados dentro del Combobox.
 *
 * - `text`  – Campo de texto plano utilizado para búsqueda y visualización.
 * - `image` – Campo que contiene una URL de imagen.
 * - `name`  – Campo principal que representa el nombre visible del registro.
 */
export type ComboboxFieldType = "text" | "image" | "name"

/**
 * Configuración de un campo del objeto genérico `T`.
 *
 * @template T Tipo del objeto que representa cada elemento de la lista.
 */
export type ComboboxField<T> = {
  /** Propiedad del objeto que se leerá */
  valueField: keyof T
  /** Rol que cumple este campo en la interfaz */
  type: ComboboxFieldType
  /** Clase CSS opcional para personalización adicional */
  className?: string
}

/**
 * Props del componente `CustoomComboBox`.
 *
 * @template T Tipo de los elementos del arreglo `items`.
 *
 * @example
 * ```tsx
 * <CustoomComboBox<Usuario>
 *   items={usuarios}
 *   valueField="id"
 *   value={form.usuarioId}
 *   onChange={(val) => form.setUsuarioId(val ? Number(val) : undefined)}
 *   fields={[
 *     { valueField: "nombre", type: "name" },
 *     { valueField: "correo", type: "text" },
 *     { valueField: "avatar", type: "image" },
 *   ]}
 *   showClear
 * />
 * ```
 */
export interface CustoomComboBoxProps<T> {
  /** Clases CSS adicionales aplicadas al contenedor raíz */
  className?: string
  /** Lista de elementos a mostrar y buscar */
  items: T[]
  /** Deshabilita el control por completo */
  disabled?: boolean
  /** Valor actualmente seleccionado (debe coincidir con el campo `valueField`) */
  value?: string
  /** Callback que se dispara cuando cambia la selección */
  onChange: (value: string | undefined) => void
  /** Configuración de los campos que se mostrarán y usarán en la búsqueda */
  fields: ComboboxField<T>[]
  /** Propiedad del objeto que actúa como identificador único de cada elemento */
  valueField: keyof T
  /** Ícono opcional que se muestra en el trigger cuando no hay selección */
  icon?: React.ReactNode
  /**
   * Muestra un botón `✕` para limpiar la selección activa.
   * @default true
   */
  showClear?: boolean
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Normaliza un texto para búsquedas insensibles a mayúsculas y acentos.
 *
 * @param value - Texto a normalizar.
 * @returns Texto en minúsculas sin diacríticos.
 *
 * @example
 * normalize("Ángel") // → "angel"
 */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

/**
 * Genera 1 o 2 iniciales en mayúsculas a partir de un nombre completo.
 *
 * @param fullName - Nombre completo del que se extraerán las iniciales.
 * @returns Iniciales en mayúsculas, o `"?"` si el nombre está vacío.
 *
 * @example
 * getInitials("Juan Pérez") // → "JP"
 * getInitials("Ana")        // → "A"
 */
function getInitials(fullName: string): string {
  if (!fullName.trim()) return "?"

  const parts = fullName.trim().replace(/\s+/g, " ").split(" ")

  if (parts.length === 1) return parts[0][0].toUpperCase()

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// ---------------------------------------------------------------------------
// Sub-componentes
// ---------------------------------------------------------------------------

/** Props internas del sub-componente `ItemRow`. */
interface ItemRowProps {
  /** Texto principal visible del elemento */
  primaryText: string
  /** Textos secundarios mostrados debajo del principal */
  secondaryTexts: string[]
  /** Indica si se debe renderizar el avatar */
  showAvatar: boolean
  /** URL de la imagen del avatar (opcional) */
  imageSrc?: string
}

/**
 * Fila visual de un elemento dentro del combobox.
 * Muestra opcionalmente un avatar con imagen o iniciales,
 * seguido del texto principal y los textos secundarios.
 */
function ItemRow({ primaryText, secondaryTexts, showAvatar, imageSrc }: ItemRowProps) {
  return (
    <div className="flex items-center gap-3 w-full min-w-0">
      {showAvatar && (
        <Avatar className="size-9 shrink-0 ring-1 ring-border">
          {imageSrc && <AvatarImage src={imageSrc} alt={primaryText} />}
          <AvatarFallback>{getInitials(primaryText)}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col min-w-0 overflow-hidden">
        <span className="font-medium text-sm truncate">{primaryText}</span>

        {secondaryTexts.map((text, index) => (
          <span key={index} className="text-xs text-muted-foreground truncate">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

/**
 * Combobox genérico y tipado, construido sobre los primitivos de `shadcn/ui`.
 *
 * ### Características
 * - Búsqueda multi-token insensible a mayúsculas y acentos.
 * - Soporte de campos `name`, `text` e `image` con renderizado de avatar.
 * - Botón de limpieza opcional (`showClear`) que resetea la selección.
 * - Compatible con `react-hook-form`, `@tanstack/react-form` y estado local.
 *
 * ### Por qué el botón de limpiar está fuera del `PopoverTrigger`
 * El `PopoverTrigger` envuelve un `<button>`. Si el botón `✕` estuviera dentro,
 * el evento `click` burbujearía hacia el trigger y abriría/cerraría el dropdown
 * al mismo tiempo que limpia. Al posicionarlo como hermano absoluto,
 * el evento queda aislado y solo ejecuta `handleClear`.
 *
 * @template T Tipo que representa la estructura de cada elemento en `items`.
 */
export function CustoomComboBox<T>({
  className,
  items,
  disabled,
  value,
  onChange,
  fields,
  valueField,
  icon,
  showClear = true,
}: CustoomComboBoxProps<T>) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  // ----- Referencias de campos derivados -----------------------------------

  const nameField  = fields.find((f) => f.type === "name")
  const imageField = fields.find((f) => f.type === "image")
  const textFields = fields.filter((f) => f.type === "text")

  /** Campos secundarios mostrados debajo del nombre/texto principal. */
  const secondaryFields = nameField ? textFields : textFields.slice(1)

  // ----- Elemento seleccionado ---------------------------------------------

  const selectedItem = useMemo(
    () => items.find((item) => String(item[valueField]) === value),
    [items, value, valueField],
  )

  // ----- Handlers ----------------------------------------------------------

  /**
   * Maneja la selección de un elemento desde la lista desplegable.
   * El valor especial `"__none__"` representa la opción "sin selección".
   */
  const handleSelect = useCallback(
    (selected: string) => {
      onChange(selected === "__none__" ? undefined : selected)
      setOpen(false)
      setSearch("")
    },
    [onChange],
  )

  /**
   * Limpia la selección sin abrir ni cerrar el dropdown.
   *
   * Es crítico llamar tanto `preventDefault` como `stopPropagation`:
   * - `preventDefault` evita que el `<button>` interno dispare submit en formularios.
   * - `stopPropagation` evita que el click llegue al `PopoverTrigger` y lo abra.
   */
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onChange(undefined)
      setSearch("")
    },
    [onChange],
  )

  // ----- Caché de búsqueda -------------------------------------------------

  /**
   * Versión pre-normalizada del texto de búsqueda de cada elemento.
   * Solo se recalcula cuando cambian `items` o `fields`.
   */
  const searchCache = useMemo(
    () =>
      items.map((item) => {
        const text = fields
          .filter((f) => f.type !== "image")
          .map((f) => String(item[f.valueField] ?? ""))
          .join(" ")

        return { item, normalized: normalize(text) }
      }),
    [items, fields],
  )

  /** Elementos filtrados en base a los tokens del texto de búsqueda. */
  const filteredItems = useMemo(() => {
    if (!search.trim()) return items

    const tokens = normalize(search).split(" ").filter(Boolean)

    return searchCache
      .filter(({ normalized }) => tokens.every((t) => normalized.includes(t)))
      .map(({ item }) => item)
  }, [search, searchCache, items])

  // ----- Helpers de render -------------------------------------------------

  /**
   * Construye las props de `ItemRow` para un elemento dado.
   *
   * @param item    - El elemento a renderizar.
   * @param variant - `"trigger"` muestra solo 1 campo secundario; `"option"` los muestra todos.
   */
  function buildRowProps(item: T, variant: "trigger" | "option"): ItemRowProps {
    const primaryText = nameField
      ? String(item[nameField.valueField] ?? "")
      : textFields[0]
        ? String(item[textFields[0].valueField] ?? "")
        : ""

    const visibleSecondary =
      variant === "trigger" ? secondaryFields.slice(0, 1) : secondaryFields

    return {
      primaryText,
      secondaryTexts: visibleSecondary.map((f) => String(item[f.valueField] ?? "")),
      showAvatar:     !!(nameField ?? imageField),
      imageSrc:       imageField ? String(item[imageField.valueField] ?? "") : undefined,
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    // `relative` es necesario para que el botón de limpiar se posicione
    // correctamente sobre el trigger sin pertenecer al árbol del Popover.
    <div className={cn("relative w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>

        {/* ── Trigger ───────────────────────────────────────────────────── */}
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            disabled={disabled}
            aria-expanded={open}
            className={cn(
              "w-full justify-between h-11 pl-3 font-normal",
              // Reserva espacio a la derecha para el botón de limpiar
              showClear && value ? "pr-16" : "pr-3",
            )}
          >
            {selectedItem ? (
              <ItemRow {...buildRowProps(selectedItem, "trigger")} />
            ) : (
              <span className="flex items-center gap-2 text-muted-foreground">
                {icon}
                Sin seleccionar
              </span>
            )}

            <ChevronsUpDownIcon className="size-4 opacity-60 shrink-0" />
          </Button>
        </PopoverTrigger>

        {/* ── Botón de limpiar ──────────────────────────────────────────
            Está FUERA del PopoverTrigger a propósito.
            Si estuviera dentro, el click abriría el dropdown al limpiar. */}
        {showClear && value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            onClick={handleClear}
            aria-label="Limpiar selección"
            className="absolute right-8 top-1/2 -translate-y-1/2 size-7 z-10 text-muted-foreground hover:text-foreground"
          >
            <XIcon className="size-4" />
          </Button>
        )}

        {/* ── Dropdown ──────────────────────────────────────────────────── */}
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl shadow-lg"
          align="start"
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Buscar..."
              value={search}
              onValueChange={setSearch}
              className="h-10"
            />

            <CommandList className="max-h-72 overflow-y-auto">
              <CommandGroup>
                {/* Opción vacía */}
                <CommandItem value="__none__" onSelect={handleSelect}>
                  <span className="text-sm text-muted-foreground">No seleccionar</span>
                  {!value && <CheckIcon size={16} className="ml-auto text-primary" />}
                </CommandItem>

                {filteredItems.map((item) => {
                  const itemId     = String(item[valueField])
                  const isSelected = value === itemId

                  return (
                    <CommandItem key={itemId} value={itemId} onSelect={handleSelect}>
                      <ItemRow {...buildRowProps(item, "option")} />
                      {isSelected && (
                        <CheckIcon size={16} className="ml-auto text-primary" />
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>

              {/* Estado vacío */}
              {search.trim() && filteredItems.length === 0 && (
                <div className="py-6 text-sm text-center text-muted-foreground">
                  No se encontraron resultados para &ldquo;
                  <span className="font-medium">{search}</span>&rdquo;
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}