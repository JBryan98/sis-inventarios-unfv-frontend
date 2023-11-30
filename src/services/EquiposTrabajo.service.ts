import { EquiposTrabajo, EquiposTrabajoRequest } from "@/interface/EquiposTrabajo.interface";
import { GenericCrudServices } from "@/utils/services/GenericService";

class EquiposTrabajoService extends GenericCrudServices<EquiposTrabajo, EquiposTrabajoRequest>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/equiposTrabajo`)
    }
}

const equiposTrabajoService = new EquiposTrabajoService();
export default equiposTrabajoService;