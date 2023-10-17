import { Categoria, CreateCategoria } from "@/interface/Categoria.interface";
import { GenericCrudServices } from "@/utils/services/GenericService";

class CategoriaService extends GenericCrudServices<Categoria, CreateCategoria>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/categorias`)
    }
}

const categoriaService = new CategoriaService();
export default categoriaService;