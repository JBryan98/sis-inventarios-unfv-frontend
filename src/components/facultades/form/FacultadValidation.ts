import * as Yup from "Yup";

export const facultadSchema = Yup.object({
    nombre: Yup.string().required(),
    siglas: Yup.string().required(),
})

export type FacultadForm = Yup.InferType<typeof facultadSchema>;