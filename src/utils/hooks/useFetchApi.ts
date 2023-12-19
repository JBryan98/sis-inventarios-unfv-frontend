import { useEffect, useReducer, useState } from "react";
import { genericFetchDataReducer } from "../reducers/GenericFetchDataReducer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FetchRequest } from "../interface/FetchRequest";
import { validateBaseParams } from "../http/BaseParamsHandler";
import { ApiResponse } from "../interface/ApiResponse";

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
    const searchParams = useSearchParams();
    const fetchMethod = fetchRequest.fetchMethod || "findAll";
    useEffect(() => {
      //router.push(pathname + "?" + validateBaseParams(fetchRequest.params));
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
    }, [searchParams.toString()]);

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

export function useFetchApi2<T>(url: string){
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if(!response.ok){
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setData(json);
      } catch (error: any) {
        setError(error);
      } finally{
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url])

  return {data, setData, isLoading, error}
}

export const useFetchFindAllPromiseAllSettled = (
  fetchs:
    | (() => Promise<ApiResponse<any>>)[]
    | (() => Promise<any> | undefined)[]
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ApiResponse<any>[] | any[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.allSettled(fetchs.map((c) => c())).then((list) => {
      const errores = (
        list.filter((c) => c.status === "rejected") as PromiseRejectedResult[]
      ).map((c) => c.reason);
      if (errores.length > 0) {
        setError(errores.join("\n"));
      }
      setData((list as PromiseFulfilledResult<any>[]).map((c) => c.value));
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    error,
    data,
  };
};