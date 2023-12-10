import { Equipo } from "./Equipo.interface";
import { EquiposTrabajo } from "./EquiposTrabajo.interface";
import { Facultad } from "./Facultad.interface";

export interface Ubicacion {
    id: number;
    nombre: string;
    facultad: Facultad;
}

export interface UbicacionConEquipos extends Ubicacion {
    equipos: Equipo[];
    equiposTrabajo: EquiposTrabajo[]
}

export type UbicacionRequest = {
    nombre: string;
    facultad: Facultad | null;
    equipos: Equipo[];
    equiposTrabajo: EquiposTrabajo[];
};