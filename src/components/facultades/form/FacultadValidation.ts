import * as Yup from "Yup";

export const facultadSchema = Yup.object({
    nombre: Yup.string().required(),
    abreviatura: Yup.string().required(),
})

export type FacultadForm = Yup.InferType<typeof facultadSchema>;