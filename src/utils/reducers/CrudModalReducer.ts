export interface ModalState {
    createEditModal: boolean;
    deleteModal: boolean;
    filterModal: boolean;
    id: number | string | null;
}

export const modalInitialState = {
    createEditModal: false,
    deleteModal: false,
    filterModal: false,
    id: null
}

export type ModalReducerActions =
  | { type: "CREATE" }
  | { type: "UPDATE"; payload: number }
  | { type: "DELETE"; payload: number }
  | { type: "FILTER" }
  | { type: "CLOSE" };

export const modalReducer = (state: ModalState, action: ModalReducerActions) => {
    switch (action.type) {
      case "CREATE":
        return {
          ...state,
          createEditModal: true,
        };
      case "UPDATE":
        return {
          ...state,
          createEditModal: true,
          id: action.payload,
        };
      case "DELETE":
        return {
          ...state,
          deleteModal: true,
          id: action.payload,
        };
      case "FILTER":
        return {
          ...state,
          filterModal: true,
        }  
      case "CLOSE":
        return {
          ...state,
          createEditModal: false,
          deleteModal: false,
          filterModal: false,
          id: null,
        };
      default:
        return state;
    }
}