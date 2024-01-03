import { Button, Grid } from '@mui/material'
import React from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { useParamsHandler } from '../hooks/useParamsHandler';
import { ModalState } from '../reducers/CrudModalReducer';
import ModalForm from '@/components/ui/form/ModalForm';
import { FieldValues, UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import { useForceResetForm } from '../hooks/useForceResetForm';

interface Props<TField extends FieldValues> {
    title: string;
    params: Record<string, string>;
    modalState: ModalState;
    handleSubmit: UseFormHandleSubmit<TField>;
    onSubmit: (values: any) => void;
    defaultValues: FieldValues;
    reset: UseFormReset<TField>;
    handleClose: () => void;
    children: React.ReactNode;
}

const FilterForm = <TField extends FieldValues>({children, title, modalState, handleSubmit, onSubmit, defaultValues, params, handleClose, reset}: Props<TField>) => {
    const { cleanFilterParamsFromUrl } = useParamsHandler();
    const { resetValues } = useForceResetForm();
    return (
      <ModalForm
        title={title}
        open={modalState.filterModal}
        handleClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
            {children}
            <Grid item xs={6} lg={4}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<FilterAltIcon/>}
                fullWidth
              >
                Filtrar
              </Button>
            </Grid>
            <Grid item xs={6} lg={4}>
              <Button
                variant="contained"
                color="secondary"
                type="button"
                startIcon={<FilterAltOffIcon/>}
                fullWidth
                onClick={() => {
                  cleanFilterParamsFromUrl();
                  reset(resetValues(defaultValues));
                }}
              >
                Limpiar
              </Button>
            </Grid>
            <Grid item xs={6} lg={4}>
              <Button
                variant="contained"
                color="error"
                type="button"
                startIcon={<FilterAltOffIcon/>}
                fullWidth
                onClick={() => {
                    cleanFilterParamsFromUrl();
                    reset(resetValues(defaultValues));
                    handleClose();
                }}
              >
                Limpiar y Cerrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </ModalForm>
    );
}

export default FilterForm   