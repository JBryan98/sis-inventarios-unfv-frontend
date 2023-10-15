import { MUIDataTableOptions } from 'mui-datatables';


export const options: MUIDataTableOptions = {
  filter: false,
  download: false,
  print: false,
  viewColumns: false,

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
    },
    toolbar: {
      search: "Buscar",
      downloadCsv: "Descargar CSV",
      print: "Imprimir",
      viewColumns: "Ver Columnas",
      filterTable: "Ordenar tabla",
    },
    filter: {
      all: "All",
      title: "FILTERS",
      reset: "RESET",
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
  selectableRows: "none",
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25, 50],
  //tableBodyHeight: "auto",
  tableBodyMaxHeight: "500px",
  responsive: "standard",
  //Recordar: esta opción estaba deprecada y arrojaba warnings
  //responsive: "scroll"
};
