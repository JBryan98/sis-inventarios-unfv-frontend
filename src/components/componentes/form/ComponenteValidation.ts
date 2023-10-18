import * as Yup from "Yup";
import "@/utils/validations/YupLocale";

export const componenteSchema = Yup.object({
    modelo: Yup.object().required(),
    estado: Yup.string().required(),
    serie: Yup.string().required()
})

export type ComponenteForm = Yup.InferType<typeof componenteSchema>;