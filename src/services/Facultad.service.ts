import { CreateFacultad, Facultad } from "@/interface/Facultad.interface";
import { GenericCrudServices } from "@/utils/services/GenericService";

class FacultadService extends GenericCrudServices<Facultad, CreateFacultad>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/facultades`)
    }
}

const facultadService = new FacultadService();
export default facultadService;