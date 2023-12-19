import { FetchData } from '@/utils/reducers/GenericFetchDataReducer';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'


interface Props<T, TField extends FieldValues>{
    control: Control<TField>;
    label: string;
    name: Path<TField>;
    optId: string | ((item: T) => T[keyof T]);
    optLabel: string | ((item: T) => string);
    fetchData?: FetchData<T>;
    data?: T[];
    autoCompleteProps?: any;
}

const FormAutocomplete = <T, TField extends FieldValues>({control, label, fetchData, data, name, autoCompleteProps, optId, optLabel}: Props<T, TField>) => {
  const optionId = (item: T) => {
    if (typeof optId === "string") {
      return item[optId as keyof typeof item];
    } else {
      return optId(item);
    }
  };

  const optionLabel = (item: T): string => {
    if (typeof optLabel === "string") {
      return String(item[optLabel as keyof typeof item]);
    } else {
      return optLabel(item);
    }
  };
  
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
          options={fetchData?.data?.content || data || []}
          getOptionLabel={optionLabel}
          isOptionEqualToValue={(option, value) => optionId(option) === optionId(value)}
          onChange={(_, value) => {
            onChange(value);
          }}
          value={value ?? null}
          renderOption={(props, option) => {
            return (
              <li {...props} key={String(optionId(option))}>
                {optionLabel(option)}
              </li>
            );
          }}
          {...autoCompleteProps}
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
                    {fetchData?.isLoading ? (
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