import { useSession } from "next-auth/react"
import { HttpStatus } from "../constants/HttpResponse";
import { ApiResponse } from "../interface/ApiResponse";

export const useCrudService = <T, C>(url: string) => {
    const { data: session } = useSession();
    const bearerToken = "Bearer " + session?.user.token;
    
    async function findAll(params: Record<string, string>): Promise<ApiResponse<T>>{
        //Si page = undefined y size = undefined
        if(params.page === undefined){
          params.page = "1"
        }
        if(params.size === undefined){
          params.size = "10"
        }
  
        const response = await fetch(url + "?" + new URLSearchParams(params), {
          headers: {
              Authorization: bearerToken,
          }
        });
        if(response.status !== HttpStatus.OK){
          const error = await response.json();
          throw error;
        }
        const data = await response.json();
        return data;
      }

    async function findById(id: number | string): Promise<T>{
        const response = await fetch(`${url}/${id}`, {
            headers: {
                Authorization: bearerToken,
            }
        });
        const data = await response.json();
        if(response.status !== HttpStatus.OK){
          const error = await response.json();
          throw error;
        }
        return data;
    }

    async function create(body: C): Promise<T>{
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearerToken,
          },
          body: JSON.stringify(body),
        });
        if (response.status !== HttpStatus.CREATED) {
          const error = await response.json();
          throw error;
        }
        const data = await response.json();
        return data;
    }

    async function update(id: string | number, body: C): Promise<T>{
        const response = await fetch(url + "/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearerToken,
          },
          body: JSON.stringify(body),
        });
        if (response.status !== HttpStatus.OK) {
          const error = await response.json();
          throw error;
        }
        const data = await response.json();
        return data;
    }

    async function deleteById(id: number | string): Promise<void>{
        await fetch(url + "/" + id, {
          method: "DELETE",
          headers: {
            Authorization: bearerToken,
          }
        });
    }

    return {
        findAll,
        findById,
        update,
        create,
        deleteById
    }
}