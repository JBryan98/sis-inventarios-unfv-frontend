import { Ubicacion } from "./Ubicacion.interface";

export interface Equipo {
    id: number;
    nombre: string;
    ubicacion: Ubicacion | null;
}