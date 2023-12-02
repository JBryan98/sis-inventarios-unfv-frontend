import { usePathname, useRouter } from "next/navigation"
/***
 * Hook personalizado para manipular los params hacia la URL
 * No se declaro useSearchParams aquí porque es necesario hacer un filtro antes de hacer el push
 */

export const useParamsHandler = () => {
    const router = useRouter();
    const pathname = usePathname();

    /**
     * Método que se encarga de pushear los params hacia la URL
     * @param searchParams Record de strings para enviar a la url
     */
    const pushParamsToUrl = (searchParams: Record<string, string>) => {
        const params = new URLSearchParams(searchParams);
        handleParamsBeforePush(params)
        router.push(`${pathname}?${params}`)
    }

    /**
     * Si el param page es igual a 1, no se debe mostrar en la URL
     * Si el param size es igual a 10, no se debe mostrar en la URL
     */
    const handleParamsBeforePush = (params: URLSearchParams) => {
        if(params.get("page") === "1"){
            params.delete("page")
        }
        if(params.get("size") === "10"){
            params.delete("size")
        }
    }

    return {
        pushParamsToUrl
    }
}