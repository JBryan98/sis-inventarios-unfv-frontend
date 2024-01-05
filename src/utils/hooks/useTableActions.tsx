import { Dispatch, SetStateAction, useState } from "react";
import { ModalReducerActions } from "../reducers/CrudModalReducer";
import { PAGEABLE_DEFAULT_VALUES } from "../constants/QueryParams";
import { MUIDataTableOptions, MUIDataTableState } from "mui-datatables";
import { options } from "@/utils/DataTableConfig";
import Spinner from "@/components/ui/Spinner";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomTableFooter from "../components/CustomTableFooter";
import { Pageable } from "../interface/Pageable";
import { useParamsHandler } from "./useParamsHandler";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const useTableActions = <T extends Pageable>(
  params: T,
  isLoading: boolean,
  totalElements: number,
  dispatchModal: Dispatch<ModalReducerActions>,
  onExportReport?: () => void
) => {
  const { size } = PAGEABLE_DEFAULT_VALUES;
  const {pushParamsToUrl} = useParamsHandler();
  const tableActions: MUIDataTableOptions = {
    ...options,
    page: (+params.page - 1) || 0 ,
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
        case "sort":
          pushParamsToUrl({
            ...params,
            page: "1",
            sort: `${tableState.sortOrder.name},${tableState.sortOrder.direction}`,
          });
        // case "search":
        //   if (tableState.searchText && tableState.searchText.length >= 3) {
        //     setParams({
        //       ...params,
        //       page: "1",
        //       referencia: tableState.searchText,
        //     });
        //   }
        //   break;
        // case "onSearchClose":
        //   setParams({
        //     ...params,
        //     referencia: "",
        //   });
        //   break;
      }
    },
    count: totalElements,
    rowsPerPage: +params.size || 10,
    customToolbar: () => {
      return (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          {onExportReport && (
            <Button
              variant="contained"
              color="warning"
              startIcon={<FileDownloadIcon />}
              onClick={() => {
                onExportReport();
              }}
            >
              Exportar
            </Button>
          )}
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              dispatchModal({ type: "CREATE" });
            }}
            startIcon={<AddCircleIcon />}
          >
            Nuevo
          </Button>
        </Box>
      );
    },
    customFooter: (rowCount: number, page: number, rowsPerPage: number) => (
      <CustomTableFooter
        rowCount={rowCount}
        page={page}
        rowsPerPage={rowsPerPage}
        params={params}
      />
    ),
  };
  return { tableActions }
};
