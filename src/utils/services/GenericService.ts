import { HttpStatus } from "../constants/HttpResponse";
import { ApiResponse } from "../interface/ApiResponse";

export abstract class GenericCrudServices<T, E>{
    public url: string;
    constructor(url: string){
        this.url = url;
    }

    public async findAll(params: Record<string, string>): Promise<ApiResponse<T>>{
      //Si page = undefined y size = undefined
      if(params.page === undefined){
        params.page = "1"
      }
      if(params.size === undefined){
        params.size = "10"
      }

        const response = await fetch(this.url + "?" + new URLSearchParams(params));
        if(response.status !== HttpStatus.OK){
          const error = await response.json();
          throw error;
        }
        const data = await response.json();
        return data;
    }

    public async findById(id: number | string): Promise<T>{
        const response = await fetch(`${this.url}/${id}`);
        const data = await response.json();
        if(response.status !== HttpStatus.OK){
          const error = await response.json();
          throw error;
        }
        return data;
    }

    public async create(body: E): Promise<T>{
        const response = await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

    public async update(id: string | number, body: E): Promise<T>{
        const response = await fetch(this.url + "/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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

    public async deleteById(id: number | string): Promise<void>{
        await fetch(this.url + "/" + id, {
          method: "DELETE",
        });
    }
}