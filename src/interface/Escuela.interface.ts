import { Facultad } from "./Facultad.interface";

export interface Escuela{
    id: number;
    nombre: string;
    abreviatura: string;
    facultad: Facultad;
}

export type EscuelaRequest = Omit<Escuela, "id">