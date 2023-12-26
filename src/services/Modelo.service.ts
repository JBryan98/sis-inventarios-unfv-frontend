import { ModeloRequest, Modelo } from "@/interface/Modelo.interface";
import { useCrudService } from "@/utils/services/useCrudService";

export const useModeloService = () => {
    return useCrudService<Modelo, ModeloRequest>(`${process.env.NEXT_PUBLIC_API_URL}/modelos`);
}