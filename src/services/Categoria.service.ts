import { GenericCrudServices } from "@/utils/services/GenericService";

class CategoriaService extends GenericCrudServices<CategoriaService, any>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/categorias`)
    }
}

const categoriaService = new CategoriaService();
export default categoriaService;