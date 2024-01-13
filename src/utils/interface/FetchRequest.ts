import { ApiResponse } from "./ApiResponse";

export interface FetchRequest<T>{
    params: Record<string, string>;
    service: {
        //[key: string]: (() => Promise<any>) | ((params: Record<string, string>) => Promise<any>);
        findAll: (params: Record<string, string>) => Promise<ApiResponse<T>>;
    }
    fetchMethod?: string;
}