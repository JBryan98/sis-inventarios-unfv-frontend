import { InferType, string, object } from "Yup";
import "@/utils/validations/YupLocale";

export const softwareSchema = object({
    nombre: string().required(),
    subcategoria: object().required(),
})

export type SoftwareForm = InferType<typeof softwareSchema>;