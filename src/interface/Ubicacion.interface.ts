import { Escuela } from "./Escuela.interface";

export interface Ubicacion {
    id: number;
    nombre: string;
    escuela: Escuela;
}

export type UbicacionRequest = Omit<Ubicacion, "id">;