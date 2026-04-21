import { baseUrl } from '@/config/base-url-env.config';
import type { ICrudRepository } from '@/shared/interfaces/i-crud-repository';
import { api } from '@/shared/services/api';
import type { CreateRolDto, RolResponseDto, UpdateRolDto } from '../dto';

/**
 * Servicio encargado de la lógica del CRUD de roles
 */
export class RolCrudService implements ICrudRepository<
  CreateRolDto,
  UpdateRolDto,
  RolResponseDto,
  number
> {
  private readonly urlRol: string;

  constructor() {
    if (!baseUrl) {
      throw new Error('La variable de entorno no está inicializada');
    }

    this.urlRol = `${baseUrl}/api/v1/usuarios/roles`;
    console.log(this.urlRol);

  }

  create = async (entity: CreateRolDto): Promise<RolResponseDto> => {
    return api(this.urlRol, {
      method: 'POST',
      body: JSON.stringify(entity),
    });
  };

  getByIdAsync = async (id: number): Promise<RolResponseDto | null> => {
    return api(`${this.urlRol}/${id}`);
  };

  update = async (
    id: number,
    entity: UpdateRolDto
  ): Promise<RolResponseDto | null> => {
    return api(`${this.urlRol}/${id}`, {
      method: 'PATCH', 
      body: JSON.stringify(entity),
    });
  };

  delete = async (id: number): Promise<boolean> => {
    try {
      await api(`${this.urlRol}/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch {
      return false;
    }
  };

  getAll = async (): Promise<RolResponseDto[]> => {
    return api(this.urlRol);
  };
}