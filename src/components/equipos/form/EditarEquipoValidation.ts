import * as Yup from "Yup";
import "@/utils/validations/YupLocale";

export const editarEquipoSchema = Yup.object({
    nombre: Yup.string().required(),
})

export type EditarEquipoForm = Yup.InferType<typeof editarEquipoSchema>;