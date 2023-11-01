import { Escuela, EscuelaRequest } from "@/interface/Escuela.interface";
import { GenericCrudServices } from "@/utils/services/GenericService";

class EscuelaService extends GenericCrudServices<Escuela, EscuelaRequest>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/escuelas`)
    }
}

const escuelaService = new EscuelaService();
export default escuelaService;