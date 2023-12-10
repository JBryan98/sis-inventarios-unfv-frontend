import { Ubicacion } from "./Ubicacion.interface";

export interface Equipo {
    id: number;
    nombre: string;
    estado: string;
    ubicacion: Ubicacion | null;
}