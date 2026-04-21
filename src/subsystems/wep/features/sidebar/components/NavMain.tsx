import { Boxes, ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { INavegationItem } from "../interface/INavWeb.interface"

type NavItem = INavegationItem

const MAX_NAV_DEPTH = 3

export function NavegationMain({ items }: { items: NavItem[] }) {
  const { setOpen, state } = useSidebar()

  const isCollapsed = state === "collapsed"

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <SidebarGroup>
      {!isCollapsed && (
        <section>
          
          <section className="mb-1 flex w-full items-center gap-2 px-2 py-1.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Boxes className="size-3.5" />
            </div>

            <div className="min-w-0">
              <SidebarHeader className="text-xs font-bold uppercase tracking-[0.22em] text-foreground">
                WEP
              </SidebarHeader>
            </div>
          </section>

          <SidebarGroupLabel className="px-3 mb-3 text-sm font-semibold text-muted-foreground">
            Navegación
          </SidebarGroupLabel>
        </section>

      )}

      <SidebarMenu className="space-y-2">
        {items.map((item) => (
          <NavMenuItem
            key={`${item.title}-${item.url}`}
            item={item}
            depth={1}
            isCollapsed={isCollapsed}
            onItemClick={handleClick}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

type NavMenuItemProps = {
  item: NavItem
  depth: number
  isCollapsed: boolean
  onItemClick: () => void
}

function NavMenuItem({
  item,
  depth,
  isCollapsed,
  onItemClick,
}: NavMenuItemProps) {
  const hasChildren = Boolean(item.items?.length) && depth < MAX_NAV_DEPTH
  const isRoot = depth === 1
  const Container = isRoot ? SidebarMenuItem : SidebarMenuSubItem

  if (hasChildren && !isCollapsed) {
    return (
      <Container>
        <Collapsible defaultOpen={item.isActive} className="group/collapsible">
          <CollapsibleTrigger asChild>
            <Button
              onClick={onItemClick}
              variant="ghost"
              className={cn(
                isRoot ? baseItemClass : subItemClass,
                isRoot && item.isActive && activeItemClass
              )}
            >
              <ItemContent item={item} isCollapsed={isCollapsed} depth={depth} />
              <ChevronRight className={chevronClass} />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub className={cn(subMenuClass, depth > 1 && "ml-2")}>
              {item.items?.map((subItem) => (
                <NavMenuItem
                  key={`${depth}-${subItem.title}-${subItem.url}`}
                  item={subItem}
                  depth={depth + 1}
                  isCollapsed={isCollapsed}
                  onItemClick={onItemClick}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </Container>
    )
  }

  return (
    <Container>
      <Button
        asChild
        variant="ghost"
        onClick={onItemClick}
        className={cn(
          isRoot ? baseItemClass : subItemClass,
          isRoot && isCollapsed && collapsedItemClass,
          isRoot && item.isActive && activeItemClass
        )}
      >
        <a href={item.url}>
          <ItemContent item={item} isCollapsed={isCollapsed} depth={depth} />
        </a>
      </Button>
    </Container>
  )
}

function ItemContent({
  item,
  isCollapsed,
  depth,
}: {
  item: NavItem
  isCollapsed: boolean
  depth: number
}) {
  const isRoot = depth === 1

  return (
    <>
      {item.icon && (
        <item.icon
          className={cn(
            isRoot ? "w-6 h-6" : "w-4 h-4",
            !isCollapsed && "opacity-90",
            !isRoot && "shrink-0"
          )}
        />
      )}

      {!isCollapsed && (
        <span
          className={cn(
            "flex-1 text-left truncate",
            !isRoot && "text-sm"
          )}
        >
          {item.title}
        </span>
      )}
    </>
  )
}

const baseItemClass = `
  w-full justify-start gap-4
  h-12 px-4
  text-base font-medium
  rounded-xl
  transition-all duration-200

  hover:bg-muted/70
  dark:hover:bg-muted/40
`

const collapsedItemClass = `
  justify-center
  px-0
  w-12 h-12

  hover:bg-muted/70
  dark:hover:bg-muted/40
`

const activeItemClass = `
  bg-primary/10 text-primary
  hover:bg-primary/15
`

const subMenuClass = "mt-1"

const subItemClass = `
  w-full justify-start
  h-9 px-2
  text-sm font-normal
  rounded-md
  hover:bg-muted/60
`

const chevronClass =
  "ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"

