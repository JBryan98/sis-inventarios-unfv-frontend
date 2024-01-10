import { InferType, string, object, array, number } from "Yup";
import "@/utils/validations/YupCustomMethods";
import "@/utils/validations/YupLocale";

const baseSchema = {
    nombres: string().trim().required(),
    apellidos: string().trim().required(),
    dni: string().required().numeric().min(8).max(8),
    email: string().email().required(),
    roles: array().min(1, "Debe elegir por lo menos un rol").required("Campo obligatorio"),
}

export const crearUsuarioSchema = object({
    ...baseSchema,
    password: string().trim().min(8).required(),
})

export const editarUsuarioSchema = object({
    ...baseSchema,
})

export type UsuarioForm = InferType<typeof crearUsuarioSchema | typeof editarUsuarioSchema>;