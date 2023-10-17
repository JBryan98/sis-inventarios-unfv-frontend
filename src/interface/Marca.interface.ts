export interface Marca {
    id: number;
    nombre: string;
}

export type CreateMarca = Omit<Marca, "id">