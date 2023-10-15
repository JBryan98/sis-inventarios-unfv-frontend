import { HttpStatus } from "../constants/HttpResponse";
import { ApiResponse } from "../interface/ApiResponse";

export abstract class GenericCrudServices<T, E>{
    public url: string;
    constructor(url: string){
        this.url = url;
    }

    public async findAll(params: Record<string, string>): Promise<ApiResponse<T>>{
        const response = await fetch(this.url + "?" + new URLSearchParams(params));
        const data = await response.json();
        return data;
    }

    public async findById(id: number): Promise<T>{
        const response = await fetch(`${this.url}/${id}`);
        const data = await response.json();
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

    public async delete(id: number): Promise<void>{
        await fetch(this.url + "/" + id, {
          method: "DELETE",
        });
    }
}