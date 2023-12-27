import { Authority } from "./Authority.interface";

export interface Rol {
    id: number;
    nombre: Authority;
}

export type RolRequest = Omit<Rol, "id">;