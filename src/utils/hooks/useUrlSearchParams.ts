import { useState } from "react";
import { PAGEABLE_DEFAULT_VALUES } from "../constants/QueryParams"
import { Pageable } from "../interface/Pageable";

export const useUrlSearchParams = <E, T extends Pageable>(urlSearchParams: T) => {
    const {page, size} = PAGEABLE_DEFAULT_VALUES;
    const initParams = (urlSearchParams: T): Record<string, string> => {
        const params: Record<string, string> = {
          page: page,
          size: size,
        };
        if (Object.keys(urlSearchParams).length !== 0) {
          Object.entries(urlSearchParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              params[key] = value;
            }
          });
        }
        return params;
    }

    const [params, setParams] = useState<Record<string, string>>(initParams(urlSearchParams));

    const setPageAfterDelete = (content: E[]) => {
        let newPage = content.length == 1 ? Number(params.page) - 1 : Number(params.page);
        if(newPage < 1){
            newPage = 1;
        }
        setParams({
            ...params,
            page: String(newPage)
        })
    }

    const setPageOnPersist = (insert: boolean) => {
        setParams({
            ...params,
            page: insert ? "1" : params.page,
        })
    }

    return { params, setParams, setPageAfterDelete, setPageOnPersist };
}