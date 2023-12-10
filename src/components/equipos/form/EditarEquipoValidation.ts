import * as Yup from "Yup";
import "@/utils/validations/YupLocale";

export const editarEquipoSchema = Yup.object({
    nombre: Yup.string().required(),
    estado: Yup.string().required(),
    ubicacion: Yup.object().notRequired(),
    hardware: Yup.array(),
    software: Yup.array(),
})

export type EditarEquipoForm = Yup.InferType<typeof editarEquipoSchema>;