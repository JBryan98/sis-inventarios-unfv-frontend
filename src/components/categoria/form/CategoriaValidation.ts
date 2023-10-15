import * as Yup from "Yup";
import "@/utils/validations/YupLocale";

export const categoriaSchema = Yup.object({
    nombre: Yup.string().trim().required()
})

export type CategoriaForm = Yup.InferType<typeof categoriaSchema>