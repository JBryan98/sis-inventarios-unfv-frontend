import * as Yup from "Yup";

export const escuelaSchema = Yup.object({
    nombre: Yup.string().required(),
    abreviatura: Yup.string().required(),
    facultad: Yup.object().required(),
})

export type EscuelaForm = Yup.InferType<typeof escuelaSchema>;