import { useEffect, useReducer } from "react";
import { genericFetchDataReducer } from "../reducers/GenericFetchDataReducer";
import { usePathname, useRouter } from "next/navigation";
import { FetchRequest } from "../interface/FetchRequest";
import { validateBaseParams } from "../http/BaseParamsHandler";

const initialState = {
    data: null,
    isLoading: false,
    error: ""
}

export function useFetchUrlApi<T>(fetchRequest: FetchRequest<T>){
    const dataFetchReducer = genericFetchDataReducer<T>();
    const [state, dispatch] = useReducer(dataFetchReducer, initialState)
    const router = useRouter();
    const pathname = usePathname();
    const fetchMethod = fetchRequest.fetchMethod || "findAll";
    useEffect(() => {
      router.push(pathname + "?" + validateBaseParams(fetchRequest.params));
      dispatch({ type: "LOADING_START", payload: null });
      fetchRequest.service[fetchMethod as keyof typeof fetchRequest.service](
        fetchRequest.params
      )
        .then((response) => {
          dispatch({ type: "FETCH_SUCCESS", payload: response });
        })
        .catch((error) => {
          dispatch({ type: "FETCH_ERROR", payload: error });
        })
        .finally(() => {
          dispatch({ type: "LOADING_END", payload: null });
        });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchRequest.params]);

    return {
        ...state
    }
}

export function useFetchApi<T>(url: string){
  const dataFetchReducer = genericFetchDataReducer<T>();
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  useEffect(() => {
    dispatch({ type: "LOADING_START", payload: null });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA")
        console.log(data)
        dispatch({ type: "FETCH_SUCCESS", payload: data })
      })
      .catch((error) => {
        dispatch({ type: "FETCH_ERROR", payload: error });
      })
      .finally(() => {
        dispatch({ type: "LOADING_END", payload: null });
      });
  }, [url])

  return {...state}
}