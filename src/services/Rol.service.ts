import { Rol } from "@/auth/interfaces/Rol.interface"
import { useCrudService } from "@/utils/services/useCrudService"

export const useRolService = () => {
    return useCrudService<Rol, any>(`${process.env.NEXT_PUBLIC_API_URL}/roles`)
}