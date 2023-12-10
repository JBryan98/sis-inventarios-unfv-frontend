import { Ubicacion, UbicacionConEquipos, UbicacionRequest } from "@/interface/Ubicacion.interface";
import { HttpStatus } from "@/utils/constants/HttpResponse";
import { GenericCrudServices } from "@/utils/services/GenericService";

class UbicacionService extends GenericCrudServices<Ubicacion, UbicacionRequest>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/ubicaciones`);
    }

    async administrarUbicacion(request: UbicacionRequest): Promise<UbicacionConEquipos>{
        const response = await fetch(this.url + "/administrar-ubicacion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });
        if(response.status !== HttpStatus.OK){
            const error = await response.json();
            throw error;
        }
        const data = await response.json();
        return data;
    }
}

const ubicacionService = new UbicacionService();
export default ubicacionService;