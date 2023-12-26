import { CreateMarca, Marca } from "@/interface/Marca.interface";
import { useCrudService } from "@/utils/services/useCrudService";

export const useMarcaService = () => {
    return useCrudService<Marca, CreateMarca>(`${process.env.NEXT_PUBLIC_API_URL}/marcas`);
}