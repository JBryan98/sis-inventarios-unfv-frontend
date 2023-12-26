import { Subcategoria, SubcategoriaRequest } from "@/interface/Subcategoria.interface";
import { useCrudService } from "@/utils/services/useCrudService";

export const useSubcategoriaService = () => {
    return useCrudService<Subcategoria, SubcategoriaRequest>(`${process.env.NEXT_PUBLIC_API_URL}/subcategorias`);
}