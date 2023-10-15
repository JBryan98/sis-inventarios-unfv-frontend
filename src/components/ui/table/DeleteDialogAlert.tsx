import { useNotification } from '@/utils/hooks/useNotification';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { Dispatch } from 'react'


interface Props {
  modalState: ModalState;
  dispatchModal: Dispatch<ModalReducerActions>;
  service: {
    deleteById: (id: number | string) => Promise<void>;
  };
  onDelete: () => void;
}

const DeleteDialogAlert = ({ modalState, dispatchModal, service, onDelete }: Props) => {
    const { notiSuccess, notiError } = useNotification();
    const handleDelete = () => {
      if (modalState.id) {
        service
          .deleteById(modalState.id)
          .then(() => {
            onDelete();
            dispatchModal({ type: "CLOSE" });
            notiSuccess("Registro eliminado con éxito");
          })
          .catch((error) => {
            notiError(error.message);
          });
      }
    };

  return (
    <Dialog
      open={modalState.deleteModal}
      onClose={() => dispatchModal({ type: "CLOSE" })}
    >
      <DialogTitle>¿Estás seguro que deseas eliminar?</DialogTitle>
      <DialogContent>Esta acción es irreversible</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatchModal({ type: "CLOSE" })}
        >
          Cancelar
        </Button>
        <Button variant="contained" color="success" onClick={handleDelete}>
            Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialogAlert