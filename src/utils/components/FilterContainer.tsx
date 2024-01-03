import { SearchForm } from '@/utils/components/SearchForm';
import { Button, Paper, Stack } from '@mui/material';
import React, { Dispatch } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { ModalReducerActions, ModalState } from '@/utils/reducers/CrudModalReducer';
import { useParamsHandler } from '@/utils/hooks/useParamsHandler';
import FilterForm from '@/utils/components/FilterForm';
import { FieldValues, UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import { useForceResetForm } from '@/utils/hooks/useForceResetForm';
import { Pageable } from '@/utils/interface/Pageable';

interface Props<T extends Pageable, TField extends FieldValues> {
    modalState: ModalState;
    dispatchModal: Dispatch<ModalReducerActions>;
    defaultValues: FieldValues;
    children: React.ReactNode;
    searchParams: T;
    modalFormTitle: string;
    handleSubmit: UseFormHandleSubmit<TField>;
    onSubmit: (values: any) => void;
    reset: UseFormReset<TField>;
}

const FilterContainer = <T extends Pageable, TField extends FieldValues>({ modalState, dispatchModal, defaultValues, children, modalFormTitle, searchParams, handleSubmit, onSubmit, reset }: Props<T, TField>) => {
    const {cleanFilterParamsFromUrl} = useParamsHandler();
    const {resetValues} = useForceResetForm();
  return (
    <Paper sx={{ padding: "16px"}}>
      <Stack flexDirection="row" justifyContent="space-between">
        <SearchForm params={searchParams} />
        <Stack flexDirection="row" gap={1}>
          <Button
            variant="contained"
            startIcon={<FilterAltIcon />}
            onClick={() => {
              dispatchModal({type: "FILTER"});
            }}
          >
            Filtrar
          </Button>
          <Button
            variant="contained"
            startIcon={<FilterAltOffIcon />}
            onClick={() => {
              cleanFilterParamsFromUrl();
              reset(resetValues(defaultValues));
            }}
            color="secondary"
          >
            Limpiar
          </Button>
        </Stack>
      </Stack>
      <FilterForm 
        title={modalFormTitle}
        params={searchParams}
        handleClose={() => {dispatchModal({type: "CLOSE"})}}
        handleSubmit={handleSubmit}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        reset={reset}
        modalState={modalState}
      >
        {children}
      </FilterForm>
    </Paper>
  );
};

export default FilterContainer