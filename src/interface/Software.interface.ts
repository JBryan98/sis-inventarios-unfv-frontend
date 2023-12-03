import { Subcategoria } from "./Subcategoria.interface";

export interface Software {
    id: number;
    nombre: string;
    subcategoria: Subcategoria;
}

export type SoftwareRequest = Omit<Software, "id">;