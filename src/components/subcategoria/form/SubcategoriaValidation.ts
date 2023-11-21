import * as Yup from "Yup";
import "@/utils/validations/YupLocale";

export const subcategoriaSchema = Yup.object({
    nombre: Yup.string().trim().required(),
    categoria: Yup.object().required()
})

export type SubcategoriaForm = Yup.InferType<typeof subcategoriaSchema>