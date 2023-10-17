import { Categoria } from "./Categoria.interface";
import { Marca } from "./Marca.interface";

export interface Modelo {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: Categoria;
    marca: Marca;
}

export type CreateModelo = Omit<Modelo, "id">;