import * as Yup from "Yup";
import "@/utils/validations/YupLocale";

export const equipoSchema = Yup.object({
    nombre: Yup.string().required(),
    hardware: Yup.object().optional().nullable(),
    software: Yup.object().optional().nullable(),
})

export type EquipoForm = Yup.InferType<typeof equipoSchema>;