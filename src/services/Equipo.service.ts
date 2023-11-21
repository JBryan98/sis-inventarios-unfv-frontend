import { Equipo, EquipoRequest } from "@/interface/EquipoConComponentes";
import { GenericCrudServices } from "@/utils/services/GenericService";

class EquipoService extends GenericCrudServices<Equipo, EquipoRequest>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/equipos`)
    }
}

const equipoService = new EquipoService();
export default equipoService;