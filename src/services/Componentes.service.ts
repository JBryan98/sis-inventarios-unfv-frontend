import { Componente, CreateComponente } from "@/interface/Componentes.interface";
import { GenericCrudServices } from "@/utils/services/GenericService";

class ComponenteService extends GenericCrudServices<Componente, CreateComponente>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/componentes`)
    }
}
const componenteService = new ComponenteService();
export default componenteService;