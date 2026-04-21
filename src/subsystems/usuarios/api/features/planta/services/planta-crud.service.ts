import { baseUrl } from "@/config/base-url-env.config";
import type { CreatePlantaDto, PlantaReponseDto, UpdatePlantaDto } from "../dto";
import type { ICrudRepository } from "@/shared/interfaces/i-crud-repository";
import { api } from "@/shared/services/api";

/**
 * Clase encargada de la logica del crud de planta
 */
export class PlantaCrudService
    implements
    ICrudRepository<
        CreatePlantaDto,
        UpdatePlantaDto,
        PlantaReponseDto,
        number
    > {
    private readonly urlPlanta: string;

    constructor() {
        if (!baseUrl) {
            throw new Error("La variable de entorno no esta incializada");
        }
        this.urlPlanta = `${baseUrl}/api/v1/plantas`;
    }

    create = async (dto: CreatePlantaDto): Promise<PlantaReponseDto> => {
        return api(`${this.urlPlanta}`, {
            method: "POST",
            body: JSON.stringify(dto),
        });
    }

    getByIdAsync = async (
        id: number
    ): Promise<PlantaReponseDto | null> => {
        return api(`${this.urlPlanta}/${id}`);
    }

    update = async (
        id: number,
        entity: UpdatePlantaDto
    ): Promise<PlantaReponseDto | null> => {
        return api(`${this.urlPlanta}/${id}`, {
            method: "PUT",
            body: JSON.stringify(entity),
        });
    }

    delete = async (id: number): Promise<boolean> => {
        try {
            await api(`${this.urlPlanta}/${id}`, {
                method: "DELETE",
            });

            return true;
        } catch {
            return false;
        }
    }

    getAll = async (): Promise<PlantaReponseDto[]> => {
        return api(this.urlPlanta);
    };
}