import { Ubicacion, UbicacionConEquipos, UbicacionRequest } from "@/interface/Ubicacion.interface";
import { HttpStatus } from "@/utils/constants/HttpResponse";
import { useCrudService } from "@/utils/services/useCrudService";
import { useSession } from "next-auth/react";

export const useUbicacionService = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/ubicaciones`;
    const { data: session } = useSession();

    const crudServices = useCrudService<Ubicacion, UbicacionRequest>(url);

    async function administrarUbicacion(request: UbicacionRequest): Promise<UbicacionConEquipos>{
        const response = await fetch(url + "/administrar-ubicacion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session?.user.token,
          },
          body: JSON.stringify(request),
        });
        if (response.status !== HttpStatus.OK) {
          const error = await response.json();
          throw error;
        }
        const data = await response.json();
        return data;
    }

    return {
        ...crudServices,
        administrarUbicacion
    }
}