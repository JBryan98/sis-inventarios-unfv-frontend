export interface Facultad {
    id: number;
    siglas: string;
    nombre: string;
}

export type CreateFacultad = Omit<Facultad, "id">;