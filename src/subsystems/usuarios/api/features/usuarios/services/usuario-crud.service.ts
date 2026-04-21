import type { ICrudRepository } from "@/shared/interfaces/i-crud-repository";
import { baseUrl } from "@/config/base-url-env.config";
import type { CreateUsuarioDto, UpdateUsuarioDto, UsuarioResponseDto } from "../dto";
import { api } from "@/shared/services/api";

/**
 * Clase encargada de la logica del crud de usuarios
 */
export class UsuarioCrudService
  implements ICrudRepository<
    CreateUsuarioDto,
    UpdateUsuarioDto,
    UsuarioResponseDto,
    number
  > {

  /**Url base de usuarios */
  private urlUsuario: string;

  constructor() {
    if (!baseUrl) {
      throw new Error("La variable de entorno no esta incializada");
    }

    this.urlUsuario = `${baseUrl}/api/v1/usuarios`;
  }

  create = async (entity: CreateUsuarioDto): Promise<UsuarioResponseDto> => {
    const formData = new FormData();

    formData.append("NombreCompleto", entity.nombreCompleto);
    formData.append("Usuario", entity.usuario);
    formData.append("Contrasena", entity.contrasena);

    if (entity.correo) {
      formData.append("Correo", entity.correo);
    }

    formData.append("Turno", entity.turno.toString());
    formData.append("PlantaId", entity.plantaId.toString());

    if (entity.imagen) {
      formData.append("Imagen", entity.imagen);
    }

    return await api(this.urlUsuario, {
      method: "POST",
      body: formData,
    });
  };

  getByIdAsync = async (id: number): Promise<UsuarioResponseDto | null> => {
    return await api(`${this.urlUsuario}/${id}`);
  }

  update = async (
    id: number,
    entity: UpdateUsuarioDto
  ): Promise<UsuarioResponseDto | null> => {
    return await api(`${this.urlUsuario}/${id}`, {
      method: "PUT",
      body: JSON.stringify(entity),
    });
  }

  delete = async (id: number): Promise<boolean> => {
    return await api(`${this.urlUsuario}/${id}`, {
      method: "DELETE",
    });
  }

  disabled = async (id: number): Promise<boolean> => {
    return await api(`${this.urlUsuario}/desactivar/${id}`, {
      method: "DELETE",
    });
  }

  enable = async (id: number): Promise<boolean> => {
    return await api(`${this.urlUsuario}/activar/${id}`, {
      method: "POST",
    });
  }

  getAll = async (): Promise<UsuarioResponseDto[]> => {
    return await api(`${this.urlUsuario}`);
  }
}