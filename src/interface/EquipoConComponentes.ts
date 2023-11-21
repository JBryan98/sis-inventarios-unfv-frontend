import { Hardware } from "./Hardware.interface";
import { Software } from "./Softawre.interface";
import { Ubicacion } from "./Ubicacion.interface";

export interface EquipoConComponentes {
    id: number;
    nombre: string;
    ubicacion: Ubicacion | null;
    hardware: Hardware[];
    software: Software[];
}

export type EquipoRequest = Omit<EquipoConComponentes, "id">;