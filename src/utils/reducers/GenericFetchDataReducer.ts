import { ApiResponse } from "../interface/ApiResponse";

export interface FetchData<T> {
  data: ApiResponse<T> | null;
  isLoading: boolean;
  error: string;
}

type FetchDataActions<T> =
  | { type: "LOADING_START"; payload: null }
  | { type: "FETCH_SUCCESS"; payload: ApiResponse<T> }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "LOADING_END"; payload: null };

export const genericFetchDataReducer =
  <T>() =>
  (state: FetchData<T>, action: FetchDataActions<T>) => {
    const { type, payload } = action;
    switch (type) {
      case "LOADING_START":
        return {
          ...state,
          isLoading: true,
        };
      case "FETCH_SUCCESS":
        return {
          ...state,
          payload: payload,
        };
      case "FETCH_ERROR":
        return {
          ...state,
          data: null,
          error: payload,
        };
      case "LOADING_END":
        return {
          ...state,
          isLoading: false,
        };
      default:
        return state;
    }
  };
