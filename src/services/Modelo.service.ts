import { CreateModelo, Modelo } from "@/interface/Modelo.interface";
import { GenericCrudServices } from "@/utils/services/GenericService";

class ModeloService extends GenericCrudServices<Modelo, CreateModelo>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/modelos`)
    }
}

const modeloService = new ModeloService();
export default modeloService;