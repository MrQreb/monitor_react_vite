# Estructura de carpetas del directorio

```plaintext
root
├─ public/

├─ src/
│
│  ├─ app/                         
│  │  ├─ providers/               # Providers globales (React Query, Theme, Auth, etc.)
│  │  │  ├─ QueryProvider.tsx     # Usa queryClient desde shared/lib
│  │  │  ├─ ThemeProvider.tsx
│  │  │  └─ AuthProvider.tsx
│  │  │
│  │  ├─ router/                  # TanStack Router root
│  │  │  ├─ index.tsx
│  │  │  └─ routeTree.gen.ts
│  │  │
│  │  ├─ layouts/                 # layouts globales
│  │  │  ├─ MainLayout.tsx
│  │  │  ├─ AuthLayout.tsx
│  │  │  ├─ ErrorLayout.tsx
│  │  │  └─ NotFound.tsx
│  │  │
│  │  └─ App.tsx
│
│  ├─ shared/                     
│  │  ├─ components/
│  │  │  ├─ ui/                  # SOLO UI (shadcn, sin lógica)
│  │  │  └─ common/              # componentes reutilizables (Button, Modal, Table)
│  │  │
│  │  ├─ hooks/                  # hooks globales reutilizables
│  │  │  ├─ useDebounce.ts
│  │  │  └─ useDisclosure.ts
│  │  │
│  │  ├─ utils/                  # helpers puros
│  │  │  ├─ formatDate.ts
│  │  │  ├─ parseError.ts
│  │  │  └─ objectToFormData.ts
│  │  │
│  │  ├─ types/                  # tipos globales
│  │  │  ├─ api-response.ts
│  │  │  └─ pagination.ts
│  │  │
│  │  ├─ constants/              # enums / constantes globales
│  │  │  └─ roles.ts
│  │  │
│  │  ├─ config/                 # configuración (env, settings)
│  │  │  └─ env.ts
│  │  │
│  │  ├─ services/               # FETCH GLOBAL CENTRALIZADO
│  │  │  └─ api.ts
│  │  │
│  │  └─ lib/                    # utilidades internas (no UI)
│  │     └─ queryClient.ts       # instancia única de React Query
│
│  ├─ store/                    
│  │  ├─ useAuthStore.ts        # estado global auth
│  │  └─ useUIStore.ts          # estado global UI (modales, loaders)
│
│  ├─ subsystems/               # organización por dominios (igual que backend)
│
│  │  ├─ usuarios/             
│  │  │  ├─ routes/            # rutas del subsistema
│  │  │  │  └─ usuarios.routes.tsx
│  │  │
│  │  │  ├─ layouts/           # layouts propios del dominio
│  │  │  │  └─ AuthLayout.tsx
│  │  │
│  │  │  ├─ store/             # estado local del dominio
│  │  │  │  └─ useUsuariosStore.ts
│  │  │
│  │  │  ├─ components/        # componentes propios del dominio
│  │  │  │  ├─ UserAvatar.tsx
│  │  │  │  ├─ UserCard.tsx
│  │  │  │  ├─ RoleBadge.tsx
│  │  │  │  └─ PermissionList.tsx
│  │  │
│  │  │  ├─ features/          
│  │  │  │
│  │  │  │  ├─ auth/           # dominio agrupado (auth completo)
│  │  │  │  │
│  │  │  │  │  ├─ login/
│  │  │  │  │  │  ├─ module/
│  │  │  │  │  │  │  ├─ services/
│  │  │  │  │  │  │  │  └─ auth.service.ts
│  │  │  │  │  │  │  ├─ dtos/
│  │  │  │  │  │  │  │  ├─ login.dto.ts
│  │  │  │  │  │  │  │  └─ auth.response.dto.ts
│  │  │  │  │  │  │  └─ mappers/       
│  │  │  │  │  │  │
│  │  │  │  │  │  ├─ hooks/
│  │  │  │  │  │  │  └─ useLogin.ts
│  │  │  │  │  │  ├─ schemas/
│  │  │  │  │  │  ├─ components/
│  │  │  │  │  │  └─ pages/
│  │  │  │  │
│  │  │  │  │  └─ register/
│  │  │  │
│  │  │  │  ├─ users/          
│  │  │  │  │  ├─ profile/
│  │  │  │  │  └─ roles-permissions/
│  │
│  │
│  │  ├─ wep/                  
│  │  │  ├─ routes/
│  │  │  ├─ layouts/
│  │  │  │  └─ DashboardLayout.tsx
│  │  │
│  │  │  ├─ store/
│  │  │
│  │  │  ├─ components/        # dominio WEP
│  │  │  │  ├─ DashboardCard.tsx
│  │  │  │  ├─ AnalyticsChart.tsx
│  │  │  │  └─ ReportTable.tsx
│  │  │
│  │  │  ├─ features/          
│  │  │  │
│  │  │  │  ├─ users/          
│  │  │  │  │  ├─ module/
│  │  │  │  │  │  ├─ services/      # lógica de API (fetch)
│  │  │  │  │  │  │  └─ user.service.ts
│  │  │  │  │  │  ├─ dtos/
│  │  │  │  │  │  │  ├─ createUser.dto.ts
│  │  │  │  │  │  │  ├─ updateUser.dto.ts
│  │  │  │  │  │  │  └─ user.response.dto.ts
│  │  │  │  │  │  └─ mappers/       
│  │  │  │  │  │
│  │  │  │  │  ├─ hooks/
│  │  │  │  │  │  ├─ queries/      
│  │  │  │  │  │  │  └─ useUsers.ts
│  │  │  │  │  │  └─ mutations/
│  │  │  │  │  │     ├─ useCreateUser.ts
│  │  │  │  │  │     └─ useUpdateUser.ts
│  │  │  │  │  │
│  │  │  │  │  ├─ schemas/
│  │  │  │  │  ├─ components/
│  │  │  │  │  └─ pages/
│  │  │  │
│  │  │  │  ├─ dashboard/
│  │  │  │  ├─ analytics/
│  │  │  │  ├─ reports/
│  │  │  │  └─ settings/
│  │
│  │
│  │  ├─ app-tags/             
│  │  │  ├─ routes/
│  │  │  ├─ layouts/
│  │  │  ├─ store/
│  │  │
│  │  │  ├─ components/        # dominio tags
│  │  │  │  ├─ TagChip.tsx
│  │  │  │  ├─ TagBadge.tsx
│  │  │  │  └─ TagSelector.tsx
│  │  │
│  │  │  ├─ features/          
│  │  │  │
│  │  │  │  ├─ tags/
│  │  │  │  │  ├─ module/
│  │  │  │  │  │  ├─ services/
│  │  │  │  │  │  ├─ dtos/
│  │  │  │  │  │  └─ mappers/
│  │  │  │  │  │
│  │  │  │  │  ├─ hooks/
│  │  │  │  │  ├─ schemas/
│  │  │  │  │  ├─ components/
│  │  │  │  │  └─ pages/
│  │  │  │
│  │  │  │  ├─ categories/
│  │  │  │  └─ tag-relations/
│
│  ├─ styles/
│  │  └─ globals.css
│
│  ├─ main.tsx
│
├─ vite.config.ts
```
