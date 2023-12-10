import * as Yup from "Yup";
import "@/utils/validations/YupLocale";

export const editarUbicacionSchema = Yup.object({
    nombre: Yup.string().required(),
    facultad: Yup.object().required(),
})

export type EditarUbicacionForm = Yup.InferType<typeof editarUbicacionSchema>;