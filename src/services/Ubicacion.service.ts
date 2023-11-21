import { Ubicacion, UbicacionRequest } from "@/interface/Ubicacion.interface";
import { GenericCrudServices } from "@/utils/services/GenericService";

class UbicacionService extends GenericCrudServices<Ubicacion, UbicacionRequest>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/ubicaciones`);
    }
}

const ubicacionService = new UbicacionService();
export default ubicacionService;