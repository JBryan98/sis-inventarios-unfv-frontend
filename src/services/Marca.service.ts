import { CreateMarca, Marca } from "@/interface/Marca.interface";
import { GenericCrudServices } from "@/utils/services/GenericService";

class MarcaService extends GenericCrudServices<Marca, CreateMarca>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/marcas`)
    }
}

const marcaService = new MarcaService();
export default marcaService;