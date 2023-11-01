export interface Facultad {
    id: number;
    abreviatura: string;
    nombre: string;
}

export type FacultadRequest = Omit<Facultad, "id">;