import { Modelo } from "./Modelo.interface";
import { Ubicacion } from "./Ubicacion.interface";

export interface EquiposTrabajo {
    id: number;
    serie: string;
    modelo: Modelo;
    estado: string;
    ubicacion: Ubicacion | null;
}

export type EquiposTrabajoRequest = Omit<EquiposTrabajo, "id" | "ubicacion">;