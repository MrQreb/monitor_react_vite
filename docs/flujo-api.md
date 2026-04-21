
### Ejemplo del modulo para las peticions

## Resumen con comunicacion con apis
```plaintext
UI (React)
   ↓
Hooks (React Query)
   ↓
Service (API calls)
   ↓
API (fetch global)
```

```plaintext
users/
├─ module/
│  ├─ services/
│  │  └─ usuario.service.ts
│  ├─ dtos/
│  │  ├─ create-usuario.dto.ts
│  │  └─ usuario.response.dto.ts
│
├─ hooks/
│  ├─ useUsuarios.ts
│  └─ useCreateUsuario.ts
```


#### Dtos
```typescript
// users/module/dtos/usuario.response.dto.ts

export interface UsuarioResponseDto {
  id: number;
  nombre: string;
  correo: string;
}
```

```typescript
// users/module/dtos/create-usuario.dto.ts

export interface CreateUsuarioDto {
  nombre: string;
  correo: string;
  password: string;
}
```

### Service
```typescript
// users/module/services/usuario.service.ts

import { api } from "@/shared/services/api";
import { CreateUsuarioDto } from "../dtos/create-usuario.dto";
import { UsuarioResponseDto } from "../dtos/usuario.response.dto";

export class UsuarioService {

  async getAll(): Promise<UsuarioResponseDto[]> {
    return api("/Usuario/buscar");
  }

  async getById(id: number): Promise<UsuarioResponseDto> {
    return api(`/Usuario/obtener-por-id/${id}`);
  }

  async create(data: CreateUsuarioDto): Promise<UsuarioResponseDto> {
    return api("/Usuario/crear", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async delete(id: number): Promise<void> {
    return api(`/Usuario/eliminar/${id}`, {
      method: "DELETE",
    });
  }
}
```


```typescript
// users/hooks/useCreateUsuario.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UsuarioService } from "../module/services/usuario.service";
import { CreateUsuarioDto } from "../module/dtos/create-usuario.dto";

const service = new UsuarioService();

export const useCreateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUsuarioDto) => service.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
};
```


### UI
```typescript
// UsersPage.tsx

import { useUsuarios } from "@/users/hooks/useUsuarios";
import { useCreateUsuario } from "@/users/hooks/useCreateUsuario";
import { useState } from "react";

export default function UsersPage() {
  const { data, isLoading, error } = useUsuarios();
  const createUsuario = useCreateUsuario();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar usuarios</p>;

  const handleCreate = () => {
    createUsuario.mutate({
      nombre,
      correo,
      password: "123456",
    });
  };

  return (
    <div>
      <h1>Usuarios</h1>

      <ul>
        {data?.map((u) => (
          <li key={u.id}>
            {u.nombre} - {u.correo}
          </li>
        ))}
      </ul>

      <h2>Crear usuario</h2>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <button onClick={handleCreate}>
        Crear usuario
      </button>
    </div>
  );
}
```



