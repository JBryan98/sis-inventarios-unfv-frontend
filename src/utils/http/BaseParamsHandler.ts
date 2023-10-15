import { PAGEABLE_DEFAULT_VALUES } from "../constants/QueryParams";

export const validateBaseParams = (params?: Record<string, string>) => {
    const  queryParams = new URLSearchParams();
    const { page, size } = PAGEABLE_DEFAULT_VALUES;
    if(params){
        Object.entries(params).forEach(([key, value]) => {
            if(value !== undefined && value !== null && value !== ""){
                if(!((key === "page" && value === page) ||(key === "size" && value === size))){
                    queryParams.set(key, value);
                }
            }
        })
    }
    return queryParams.toString();
}