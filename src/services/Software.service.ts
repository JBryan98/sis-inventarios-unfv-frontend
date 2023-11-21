import { Software, SoftwareRequest } from "@/interface/Softawre.interface";
import { GenericCrudServices } from "@/utils/services/GenericService";

class SoftwareService extends GenericCrudServices<Software, SoftwareRequest> {
  constructor() {
    super(`${process.env.NEXT_PUBLIC_API_URL}/software`);
  }
}

const softwareService = new SoftwareService();
export default softwareService;