import { ChangeMyPasswordUserRequest, ChangePsswordAdminRequest } from "@/auth/interfaces/Password.interface";
import { Usuario, UsuarioRequest } from "@/auth/interfaces/Usuario.interface"
import { HttpStatus } from "@/utils/constants/HttpResponse";
import { useCrudService } from "@/utils/services/useCrudService"
import { useSession } from "next-auth/react";

export const useUsuarioService = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios`;
    const { data: session } = useSession();

    async function changeMyPassword(request: ChangeMyPasswordUserRequest): Promise<void>{
        const response = await fetch(url + "/change-my-password", {
          method: "PUT",
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
    }

    async function changePasswordAdmin(email: string, request: ChangePsswordAdminRequest): Promise<void>{
        const response = await fetch(`${url}/${email}/change-password`, {
          method: "PUT",
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
    }
    return {
        ...useCrudService<Usuario, UsuarioRequest>(url),
        changeMyPassword,
        changePasswordAdmin
    }
}