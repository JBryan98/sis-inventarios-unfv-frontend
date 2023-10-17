import * as  Yup from "Yup";
import "@/utils/validations/YupLocale"

export const modeloSchema = Yup.object({
    nombre: Yup.string().trim().required(),
    descripcion: Yup.string().trim().notRequired(),
    marca: Yup.object().required(),
    categoria: Yup.object().required(),
})

export type ModeloForm = Yup.InferType<typeof modeloSchema>;