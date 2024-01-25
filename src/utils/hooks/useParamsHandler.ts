import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchParams } from "../interface/Pageable";
/***
 * Hook personalizado para manipular los params hacia la URL
 * No se declaro useSearchParams aquí porque es necesario hacer un filtro antes de hacer el push
 */

export const useParamsHandler = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    /**
     * Método que se encarga de pushear los params hacia la URL
     * @param searchParams Record de strings para enviar a la url
     */
    const pushParamsToUrl = (searchParams: SearchParams) => {
        const cleanParams = handleParamsBeforePush(searchParams)
        router.push(`${pathname}?${new URLSearchParams(cleanParams)}`)
    }

    /**
     * Si el param page es igual a 1, no se debe mostrar en la URL
     * Si el param size es igual a 10, no se debe mostrar en la URL
     */
    const handleParamsBeforePush = (searchParams: SearchParams) => {
        handlePageAndSizeParams(searchParams);
        validateNotEmptyParams(searchParams);
        return searchParams as Record<string, string>;
    }

    /**
     * Si el param page es igual a 1, no se debe mostrar en la URL
     * Si el param size es igual a 10, no se debe mostrar en la URL
     */
    const handlePageAndSizeParams = (searchParams: SearchParams) => {
      if (searchParams.page && searchParams.page === "1") {
        delete searchParams.page;
      }
      if (searchParams.size && searchParams.size === "10") {
        delete searchParams.size;
      }
    }

    /**
     * Método para limpiar los params vacíos o undefined e incluso nulos de ser necesario.
     */
    const validateNotEmptyParams = (params: SearchParams): Record<string, string> => {
      Object.entries(params).forEach(([key, value]) => {
        if (value === "" || value === undefined || value === null) {
          delete params[key];
        }
      });
      return params as Record<string, string>;
    };

    /**
     * Método para limpiar los filtros de la url
     * @param params params
     */
    const cleanFilterParamsFromUrl = () => {
      const paramsFromUrl = new URLSearchParams(searchParams);
      if(paramsFromUrl.size > 0){
        while(paramsFromUrl.size > 0){
          paramsFromUrl.forEach((value, key) => {
            paramsFromUrl.delete(key);
          });
        }
      }
      router.push(`${pathname}?${paramsFromUrl}`)
    };

    return {
        pushParamsToUrl,
        cleanFilterParamsFromUrl,
        validateNotEmptyParams
    }
}