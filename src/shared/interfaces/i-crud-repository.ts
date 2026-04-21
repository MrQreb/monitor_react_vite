/**
 * Interfaz encargada de los metodos crud de las servicios
 */

export interface ICrudRepository<
    /** Dto de creacion */
    TCreate,
    /** Dto de actualizacion */
    TUpdate,
    /** Como luce la response del backend */
    TResponse,
    /** Como luce la primary key */
    TKey,
> {
    
    /**Crea una entidad de ese tipo y devuelve una respuesta */
    create(entity: TCreate): Promise<TResponse>;
    
    /**Busca una entidad por id, y devuelve una respuesta */
    getByIdAsync(id: TKey): Promise<TResponse | null>;
    
    /**Busca una entidad por id, la actualiza y devuelve una respuesta */
    update(id: TKey, entity: TUpdate): Promise<TResponse | null>;
    
    /**Elimina una entidad por id */
    delete(id: TKey): Promise<boolean>;
    
    /**Obtiene una lista de una entidad */
    getAll(): Promise<TResponse[]>;
}