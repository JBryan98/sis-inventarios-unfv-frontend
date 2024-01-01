import { EquiposDashboard, EquiposTrabajoDashboard, HardwareDashboard } from "@/interface/Dashboard.interface";
import { HttpStatus } from "@/utils/constants/HttpResponse";
import { useSession } from "next-auth/react";

export const useDashboardService = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard`;
    const {data: session} = useSession();

    async function getHardwareDashboard(): Promise<HardwareDashboard>{
        const response = await fetch(url + "/hardware", {
            headers: {
                Authorization: "Bearer " + session?.user.token
            }
        });
        if(response.status !== HttpStatus.OK){
            const error = await response.json();
            throw error;
        }
        const data = await response.json();
        return data;
    }

    async function getEquiposTrabajoDashboard(): Promise<EquiposTrabajoDashboard>{
        const response = await fetch(url + "/equipos-de-trabajo", {
            headers: {
                Authorization: "Bearer " + session?.user.token
            }
        });
        if(response.status !== HttpStatus.OK){
            const error = await response.json();
            throw error;
        }
        const data = await response.json();
        return data;
    }

    async function getEquiposDasboard(): Promise<EquiposDashboard>{
        const response = await fetch(url + "/equipos", {
            headers: {
                Authorization: "Bearer " + session?.user.token
            }
        });
        if(response.status !== HttpStatus.OK){
            const error = await response.json();
            throw error;
        }
        const data = await response.json();
        return data;
    }

    return {
        getHardwareDashboard,
        getEquiposTrabajoDashboard,
        getEquiposDasboard
    }
}