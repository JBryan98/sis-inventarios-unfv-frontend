import { EquipoRequest } from "@/interface/EquipoConComponentes";
import { Hardware } from "@/interface/Hardware.interface";
import { Software } from "@/interface/Software.interface";

export const equipoReducerInitialState: EquipoRequest = {
  nombre: "",
  estado: "",
  ubicacion: null,
  hardware: [],
  software: [],
};

type EquipoReducerActions =
  | { type: "AGREGAR_HARDWARE"; payload: Hardware }
  | { type: "AGREGAR_SOFTWARE"; payload: Software }
  | { type: "REMOVER_HARDWARE"; payload: Hardware[] }
  | { type: "REMOVER_SOFTWARE"; payload: Software[] };

export const equipoReducer = (state: EquipoRequest, action: EquipoReducerActions) => {
  const { type, payload } = action;
  switch (type) {
    case "AGREGAR_HARDWARE":
      return {
        ...state,
        hardware: [
          ...state.hardware,
          payload
        ],
      };
    case "AGREGAR_SOFTWARE":
      return {
        ...state,
        software: [
          ...state.software,
          payload
        ],
      };
    case "REMOVER_HARDWARE":
      return {
        ...state,
        hardware: payload,
      };
    case "REMOVER_SOFTWARE":
      return {
        ...state,
        software: payload,
      };
    default:
      return state;
  }
};
