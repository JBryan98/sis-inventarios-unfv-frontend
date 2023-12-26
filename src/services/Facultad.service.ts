import { FacultadRequest, Facultad } from "@/interface/Facultad.interface";
import { useCrudService } from "@/utils/services/useCrudService";

export const useFacultadService = () => {
    return useCrudService<Facultad, FacultadRequest>(`${process.env.NEXT_PUBLIC_API_URL}/facultades`);
}