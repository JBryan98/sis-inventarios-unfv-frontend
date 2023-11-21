import { Categoria } from "./Categoria.interface";

export interface Subcategoria {
    id: number;
    nombre: string;
    categoria: Categoria;
}

export type SubcategoriaRequest = Omit<Subcategoria, "id">;