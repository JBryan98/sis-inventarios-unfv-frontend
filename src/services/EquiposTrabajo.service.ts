import { EquiposTrabajo, EquiposTrabajoRequest } from "@/interface/EquiposTrabajo.interface";
import { useCrudService } from "@/utils/services/useCrudService";

export const useEquiposTrabajoService = () => {
    return useCrudService<EquiposTrabajo, EquiposTrabajoRequest>(`${process.env.NEXT_PUBLIC_API_URL}/equipos-de-trabajo`);
}