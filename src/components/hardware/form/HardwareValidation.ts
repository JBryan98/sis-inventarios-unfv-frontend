import * as Yup from "Yup";
import "@/utils/validations/YupLocale";

export const hardwareSchema = Yup.object({
    modelo: Yup.object().required(),
    estado: Yup.string().required(),
    serie: Yup.string().required()
})

export type HardwareForm = Yup.InferType<typeof hardwareSchema>;