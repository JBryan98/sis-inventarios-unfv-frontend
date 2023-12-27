import { Rol } from "./Rol.interface";

export interface Usuario {
    id: number;
    nombres: string;
    apellidos: string;
    dni: string;
    email: string;
    roles: Rol[]
}

export type UsuarioRequest = Omit<Usuario, "id">;