import * as Yup from "Yup";
import "@/utils/validations/YupLocale";

export const equiposTrabajoSchema = Yup.object({
    serie: Yup.string().required(),
    modelo: Yup.object().required(),
    estado: Yup.string().required(),
})

export type EquiposTrabajoForm = Yup.InferType<typeof equiposTrabajoSchema>;