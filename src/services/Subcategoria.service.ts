import { Subcategoria, SubcategoriaRequest } from "@/interface/Subcategoria.interface";
import { GenericCrudServices } from "@/utils/services/GenericService";

class SubcategoriaService extends GenericCrudServices<Subcategoria, SubcategoriaRequest>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/subcategorias`)
    }
}

const subcategoriaService = new SubcategoriaService();
export default subcategoriaService;