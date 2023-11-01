import { Hardware, HardwareRequest } from "@/interface/Hardware.interface";
import { GenericCrudServices } from "@/utils/services/GenericService";

class HardwareService extends GenericCrudServices<Hardware, HardwareRequest>{
    constructor(){
        super(`${process.env.NEXT_PUBLIC_API_URL}/hardware`)
    }
}
const componenteService = new HardwareService();
export default componenteService;