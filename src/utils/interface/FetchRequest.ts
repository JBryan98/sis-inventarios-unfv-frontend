import { ApiResponse } from "./ApiResponse";

export interface FetchRequest<T>{
    params: Record<string, string>;
    service: {
        findAll: (params: Record<string, string>) => Promise<ApiResponse<T>>;
    }
    fetchMethod?: string;
}