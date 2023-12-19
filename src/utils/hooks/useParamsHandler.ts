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
        handleParamsBeforePush(searchParams)
        router.push(`${pathname}?${new URLSearchParams(searchParams)}`)
    }

    /**
     * Si el param page es igual a 1, no se debe mostrar en la URL
     * Si el param size es igual a 10, no se debe mostrar en la URL
     */
    const handleParamsBeforePush = (searchParams: Record<string, string>) => {
        handlePageAndSizeParams(searchParams);
        validateNotEmptyParams(searchParams);
    }

    /**
     * Si el param page es igual a 1, no se debe mostrar en la URL
     * Si el param size es igual a 10, no se debe mostrar en la URL
     */
    const handlePageAndSizeParams = (searchParams: Record<string, string>) => {
        if(searchParams.page === "1"){
            delete searchParams.page;
        }
        if(searchParams.size === "10"){
            delete searchParams.size;
        }
    }

    /**
     * Método para limpiar los params vacíos o undefined
     */
    const validateNotEmptyParams = (params: Record<string, string>) => {
      Object.entries(params).forEach(([key, value]) => {
        if (value === "" || value === undefined) {
          delete params[key];
        }
      });
    };

    /**
     * Método para limpiar los filtros de la url
     * @param params params
     */
    const cleanFilterParamsFromUrl = (params: Record<string, string>) => {
      if (Object.keys(params).length > 2) {
        Object.entries(params).forEach(([key, value]) => {
          if (key !== "page" && key !== "size") {
            delete params[key];
          }
        });
        pushParamsToUrl({ ...params, page: "1", size: "10" });
      }
    };

    return {
        pushParamsToUrl,
        cleanFilterParamsFromUrl
    }
}