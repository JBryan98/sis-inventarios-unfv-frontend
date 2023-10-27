import { Dispatch, SetStateAction, useState } from "react";
import { ModalReducerActions } from "../reducers/CrudModalReducer";
import { PAGEABLE_DEFAULT_VALUES } from "../constants/QueryParams";
import { MUIDataTableOptions, MUIDataTableState } from "mui-datatables";
import { options } from "@/utils/DataTableConfig";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const useTableActions = (
  params: Record<string, string>,
  setParams: Dispatch<SetStateAction<Record<string, string>>>,
  isLoading: boolean,
  totalElements: number,
  dispatchModal: Dispatch<ModalReducerActions>
) => {
  const { size } = PAGEABLE_DEFAULT_VALUES;
  const tableActions: MUIDataTableOptions = {
    ...options,
    page: Number(params.page) - 1,
    textLabels: {
      ...options.textLabels,
      body: {
        ...options.textLabels?.body,
        noMatch: isLoading ? (
          <Spinner />
        ) : (
          "Lo sentimos no se encontraron registros coincidentes"
        ),
      },
    },
    searchPlaceholder: "Buscar...",
    onTableChange: (action: string, tableState: MUIDataTableState) => {
      switch (action) {
        case "changePage":
          setParams({
            ...params,
            page: String(tableState.page + 1),
          });
          break;
        case "changeRowsPerPage":
          setParams({
            ...params,
            size: String(tableState.rowsPerPage),
          });
          break;
        case "sort": 
          setParams({
            ...params,
            page: "1",
            sort: `${tableState.sortOrder.name},${tableState.sortOrder.direction}`
          })  
        case "search":
          if (tableState.searchText && tableState.searchText.length >= 3) {
            setParams({
              ...params,
              page: "1",
              referencia: tableState.searchText,
            });
          }
          break;
        case "onSearchClose":
          setParams({
            ...params,
            referencia: "",
          });
          break;
      }
    },
    count: totalElements,
    rowsPerPageOptions: Array.from(new Set([Number(params.size), 5, 10, 25, 50])).sort((a, b) => a - b),
    rowsPerPage: Number(params.size),
    customToolbar: () => {
      return (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              dispatchModal({ type: "CREATE" });
            }}
          >
            <AddIcon /> Nuevo
          </Button>
        </>
      );
    },
  };
  return { tableActions }
};
