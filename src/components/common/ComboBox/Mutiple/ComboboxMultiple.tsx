'use client'

import { useId, useState } from 'react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type ComboboxOption<T extends string | number> = {
  value: T
  label: string
}

type ComboboxMultipleProps<T extends string | number> = {
  items: ComboboxOption<T>[]
  value: T[]
  onChange: (next: T[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  countLabel?: string
  className?: string
}

export function ComboboxMultiple<T extends string | number>({
  items,
  value,
  onChange,
  placeholder = 'Seleccionar',
  searchPlaceholder = 'Buscar...',
  emptyText = 'Sin resultados.',
  countLabel = 'seleccionados',
  className
}: ComboboxMultipleProps<T>) {
  const id = useId()
  const [open, setOpen] = useState(false)

  const toggleSelection = (val: T) => {
    onChange(value.includes(val) ? value.filter(v => v !== val) : [...value, val])
  }

  return (
    <div className={`w-full max-w-xs space-y-2 ${className ?? ''}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='h-auto min-h-8 w-full justify-between hover:bg-transparent'
          >
            {value.length > 0 ? (
              <span>
                <Badge variant='outline' className='rounded-sm'>
                  {value.length}
                </Badge>{' '}
                {countLabel}
              </span>
            ) : (
              <span className='text-muted-foreground'>{placeholder}</span>
            )}
            <ChevronsUpDownIcon className='text-muted-foreground/80 shrink-0' aria-hidden='true' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-(--radix-popper-anchor-width) p-0'>
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {items.map(item => (
                  <CommandItem
                    key={String(item.value)}
                    value={String(item.value)}
                    onSelect={() => toggleSelection(item.value)}
                  >
                    <span className='truncate'>{item.label}</span>
                    {value.includes(item.value) && <CheckIcon size={16} className='ml-auto' />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}