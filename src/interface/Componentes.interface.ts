import { Modelo } from "./Modelo.interface";

export interface Componente{
    id: number;
    serie: string;
    estado: string;
    modelo: Modelo;
}

export type CreateComponente = Omit<Componente, "id">