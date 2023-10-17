import { FetchData } from '@/utils/reducers/GenericFetchDataReducer';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'


interface Option  {
  id: number;
  nombre: string
}

interface Props<T extends Option, TField extends FieldValues>{
    control: Control<TField>;
    label: string;
    name: Path<TField>;
    fetchData: FetchData<T>;
    autoCompleteProps?: any;
}

const FormAutocomplete = <T extends Option, TField extends FieldValues>({control, label, fetchData, name, autoCompleteProps}: Props<T, TField>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        formState: { errors },
      }) => (
        <Autocomplete
          loading={fetchData?.isLoading}
          options={fetchData.data?.content || []}
          getOptionLabel={(option) => option.nombre}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, value) => {
            onChange(value);
          }}
          value={value ?? null}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.nombre}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={ref}
              variant="outlined"
              label={label}
              name={name}
              fullWidth
              onBlur={onBlur}
              error={!!errors[name]}
              helperText={String(errors[name]?.message ?? "")}
              autoComplete="off"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {fetchData.isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
}

export default FormAutocomplete