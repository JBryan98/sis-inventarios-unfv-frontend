import { Equipo } from "./Equipo.interface";
import { Modelo } from "./Modelo.interface";

export interface Hardware{
    id: number;
    serie: string;
    estado: string;
    modelo: Modelo;
    equipo: Equipo | null;
}

export type HardwareRequest = Omit<Hardware, "id">