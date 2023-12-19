import InputForm from '@/components/ui/form/InputForm'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Pageable } from '../interface/Pageable'
import { IconButton, InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useParamsHandler } from '../hooks/useParamsHandler'

interface Props<T> {
    params: T
}

export const SearchForm = <T extends Pageable>({params}: Props<T>) => {
    const {control, handleSubmit} = useForm({
        defaultValues: {
            referencia: params.referencia || ""
        }
    })

    const {pushParamsToUrl} = useParamsHandler();

    const onSubmit = (values: any) => {
        pushParamsToUrl({
            ...params,
            referencia: values.referencia
        });
    }
    

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <InputForm
        control={control}
        name="referencia"
        label="Buscar"
        textFieldProps={{
          size: "small",
          fullWidth: false,
          placeholder: "Buscar ...",
          InputProps: {
            sx: {minWidth: { xs: "284px", lg: "600px"}},
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit">
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </form>
  );
}
