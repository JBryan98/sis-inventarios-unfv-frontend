import { Usuario, UsuarioRequest } from "@/auth/interfaces/Usuario.interface"
import { useCrudService } from "@/utils/services/useCrudService"

export const useUsuarioService = () => {
    return useCrudService<Usuario, UsuarioRequest>(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`)
}