import { Hardware, HardwareRequest } from "@/interface/Hardware.interface";
import { useCrudService } from "@/utils/services/useCrudService";

export const useHardwareService = () => {
    return useCrudService<Hardware, HardwareRequest>(`${process.env.NEXT_PUBLIC_API_URL}/hardware`)
}