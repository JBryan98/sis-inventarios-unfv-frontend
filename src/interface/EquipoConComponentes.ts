import { Hardware } from "./Hardware.interface";
import { Software } from "./Software.interface";
import { Ubicacion } from "./Ubicacion.interface";

export interface EquipoConComponentes {
    id: number;
    nombre: string;
    estado: string;
    ubicacion: Ubicacion | null;
    hardware: Hardware[];
    software: Software[];
}

export type EquipoRequest = Omit<EquipoConComponentes, "id">;