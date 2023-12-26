import { Software, SoftwareRequest } from "@/interface/Software.interface";
import { useCrudService } from "@/utils/services/useCrudService";

export const useSoftwareService = () => {
  return useCrudService<Software, SoftwareRequest>(`${process.env.NEXT_PUBLIC_API_URL}/software`);
}