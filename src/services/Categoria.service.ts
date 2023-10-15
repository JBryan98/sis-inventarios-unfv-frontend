import { Categoria, CreateCategoria } from "@/interface/Categoria.interface";
import { GenericCrudServices } from "@/utils/services/GenericService";

class CategoriaService extends GenericCrudServices<Categoria, CreateCategoria>{
    constructor(){
        // super(`${process.env.NEXT_PUBLIC_API_URL}/categorias`)
        super("http://localhost:8080/sistema_inventarios_unfv/api/categorias")
    }
}

const categoriaService = new CategoriaService();
export default categoriaService;