import { Categoria, CreateCategoria } from "@/interface/Categoria.interface";
import { useCrudService } from "@/utils/services/useCrudService";

export const useCategoriaService = () => {
    return useCrudService<Categoria, CreateCategoria>(`${process.env.NEXT_PUBLIC_API_URL}/categorias`)
}