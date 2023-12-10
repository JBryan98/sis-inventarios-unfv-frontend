import { Equipo } from "@/interface/Equipo.interface";
import { EquipoRequest } from "@/interface/EquipoConComponentes";
import { HttpStatus } from "@/utils/constants/HttpResponse";
import { GenericCrudServices } from "@/utils/services/GenericService";

class EquipoService extends GenericCrudServices<Equipo, EquipoRequest>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/equipos`)
    }

    async administrarEquipo(request: EquipoRequest){
        const response = await fetch(this.url + "/administrar-equipo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        });
        if(response.status !== HttpStatus.OK){
            const error = await response.json();
            throw error;
        }
        const data = await response.json();
        return data;
    }
}

const equipoService = new EquipoService();
export default equipoService;