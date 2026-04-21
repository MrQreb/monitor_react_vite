import { Search } from "lucide-react"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export const EmptySearch = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
        <EmptyTitle>Sin roles</EmptyTitle>
        <EmptyDescription>
          Prueba otra busqueda.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
