import { Categoria } from "./Categoria.interface";
import { Marca } from "./Marca.interface";
import { Subcategoria } from "./Subcategoria.interface";

export interface Modelo {
    id: number;
    nombre: string;
    descripcion: string;
    subcategoria: Subcategoria;
    marca: Marca;
}

export type ModeloRequest = Omit<Modelo, "id">;