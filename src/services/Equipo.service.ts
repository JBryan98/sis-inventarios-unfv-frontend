import { Equipo } from "@/interface/Equipo.interface";
import { EquipoRequest } from "@/interface/EquipoConComponentes";
import { HttpStatus } from "@/utils/constants/HttpResponse";
import { useCrudService } from "@/utils/services/useCrudService";
import { useSession } from "next-auth/react";

export const useEquipoService = () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/equipos`;
  const { data: session } = useSession();
  
  const crudServices = useCrudService<Equipo, EquipoRequest>(url);
  
  async function administrarEquipo(request: EquipoRequest) {
    const response = await fetch(url + "/administrar-equipo", {
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

  return { ...crudServices, administrarEquipo };
};
