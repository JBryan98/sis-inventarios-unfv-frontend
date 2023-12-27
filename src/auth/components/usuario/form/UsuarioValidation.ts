import { InferType, string, object, array } from "Yup";
import "@/utils/validations/YupLocale";
import "@/utils/validations/YupCustomMethods";

const baseSchema = {
    nombres: string().trim().required(),
    apellidos: string().trim().required(),
    dni: string().numeric().min(8).required(),
    email: string().email().required(),
    roles: array().required(),
}

export const crearUsuarioSchema = object({
    ...baseSchema,
    password: string().trim().min(8).required(),
})

export const editarUsuarioSchema = object({
    ...baseSchema,
})

export type UsuarioForm = InferType<typeof crearUsuarioSchema | typeof editarUsuarioSchema>;