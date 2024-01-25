import { ApiResponse } from "./ApiResponse";
import { SearchParams } from "./Pageable";

export interface FetchRequest<T>{
    params: SearchParams;
    service: {
        //[key: string]: (() => Promise<any>) | ((params: Record<string, string>) => Promise<any>);
        findAll: (params: Record<string, string>) => Promise<ApiResponse<T>>;
    }
    fetchMethod?: string;
}