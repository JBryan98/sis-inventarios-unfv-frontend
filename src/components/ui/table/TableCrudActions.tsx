import { IconButton, Tooltip } from '@mui/material'
import React, { Dispatch } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalReducerActions } from '@/utils/reducers/CrudModalReducer';
import { MUIDataTableMeta } from 'mui-datatables';

interface Props {
    dispatchModal: Dispatch<ModalReducerActions>;
    tableMeta: MUIDataTableMeta;
}

const TableCrudActions = ({ dispatchModal, tableMeta }: Props) => {
  return (
    <>
      <Tooltip title="Editar">
        <IconButton
          onClick={() => {
            dispatchModal({
              type: "UPDATE",
              payload: tableMeta.rowData[1],
            });
          }}
        >
          <EditIcon  color='warning'/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar">
        <IconButton
          onClick={() => {
            dispatchModal({
              type: "DELETE",
              payload: tableMeta.rowData[1],
            });
          }}
        >
          <DeleteIcon color='error'/>
        </IconButton>
      </Tooltip>
    </>
  );
}

export default TableCrudActions