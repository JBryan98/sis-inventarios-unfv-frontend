import * as Yup from "Yup";
import "@/utils/validations/YupLocale";

export const crearUbicacionSchema = Yup.object({
    nombre: Yup.string().required(),
    facultad: Yup.object().required(),
    equipos: Yup.object().optional().nullable(),
    equiposTrabajo: Yup.object().optional().nullable(),
})

export type CrearUbicacionForm = Yup.InferType<typeof crearUbicacionSchema>;