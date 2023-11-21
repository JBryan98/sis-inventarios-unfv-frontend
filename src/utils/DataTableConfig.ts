import { MUIDataTableOptions } from 'mui-datatables';


export const options: MUIDataTableOptions = {
  jumpToPage: true,
  download: false,
  print: false,
  viewColumns: false,
  search: true,
  tableId: "ssr",
  serverSide: true,
  textLabels: {
    body: {
      noMatch: "Lo sentimos, no se encontraron registros coincidentes",
      toolTip: "Ordenar",
      columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
    },
    pagination: {
      next: "Siguiente",
      previous: "Anterior",
      rowsPerPage: "Filas por página:",
      displayRows: "de",
      jumpToPage: "Saltar a la página"
    },
    toolbar: {
      search: "Buscar",
      downloadCsv: "Descargar CSV",
      print: "Imprimir",
      viewColumns: "Ver Columnas",
      filterTable: "Ordenar tabla",
    },
    filter: {
      all: "TODOS",
      title: "FILTROS",
      reset: "REINICIAR",
    },
    viewColumns: {
      title: "Ver Columnas",
      titleAria: "Mostrar/Ocultar Columnas",
    },
    selectedRows: {
      text: "fila(s) seleccionadas",
      delete: "Eliminar",
      deleteAria: "Eliminar filas seleccionadas",
    },
  },
  enableNestedDataAccess: ".",
  selectableRows: "none",
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10,  25, 50],
  responsive: "standard",
};