import * as Yup from "Yup";
import "@/utils/validations/YupLocale";

export const marcaSchema = Yup.object({
    nombre: Yup.string().trim().required()
})

export type MarcaForm = Yup.InferType<typeof marcaSchema>