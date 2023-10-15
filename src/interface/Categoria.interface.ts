export interface Categoria {
    id: number;
    nombre: string;
}

export type CreateCategoria = Omit<Categoria, "id">