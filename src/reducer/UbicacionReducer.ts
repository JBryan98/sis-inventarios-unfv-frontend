import { Equipo } from "@/interface/Equipo.interface";
import { EquiposTrabajo } from "@/interface/EquiposTrabajo.interface";
import { UbicacionRequest } from "@/interface/Ubicacion.interface";

export const ubicacionReducerInitialState: UbicacionRequest = {
    nombre: "",
    facultad: null,
    equipos: [],
    equiposTrabajo: []
};

type UbicacionReducerActions = 
| { type: "AGREGAR_EQUIPO"; payload: Equipo }
| { type: "AGREGAR_EQUIPOS_TRABAJO"; payload: EquiposTrabajo }
| { type: "REMOVER_EQUIPO"; payload: Equipo[] }
| { type: "REMOVER_EQUIPOS_TRABAJO"; payload: EquiposTrabajo[] };

export const ubicacionReducer = (state: UbicacionRequest, action: UbicacionReducerActions) => {
    const { type, payload } = action;
    switch (type) {
      case "AGREGAR_EQUIPO":
        return {
          ...state,
          equipos: [...state.equipos, payload],
        };
      case "AGREGAR_EQUIPOS_TRABAJO":
        return {
          ...state,
          equiposTrabajo: [...state.equiposTrabajo, payload],
        };
      case "REMOVER_EQUIPO":
        return {
          ...state,
          equipos: payload,
        };
      case "REMOVER_EQUIPOS_TRABAJO":
        return {
          ...state,
          equiposTrabajo: payload,
        };
      default:
        return state;
    }
}
