import { FetchData } from "@/utils/reducers/GenericFetchDataReducer";
import { Autocomplete, Chip, CircularProgress, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";


/**
 * Props del componente IAAutocompleteMultiValue
 * @param control Objeto que permite registrar el componente de MUI en React Hook Form
 * @param label Label del TextField
 * @param name Name del TextField
 * @param errors Error especificado dentro de yup
 * @param setValue Método de React Hook Form que permite setear valores de un campo en específico
 * @param fetchData Data que proviene mediante una llamada a la Api
 * @param data Arreglo de opciones predefinidas (no vienen de la Api)
 * @param optId Es el nombre de la propiedad del objeto, en caso pase una funcion, el parámetro es el objeto, para definir el ID
 * @param optLabel  Es el nombre de la propiedad del objeto, en caso pase una funcion, el parámetro es el objeto, para definir el LABEL
 * @param disabled Prop del Autocomplete para deshabilitar el TextField, por defecto se inicializa en false
 * @param onChange Método personalizado para manejar el onChange del componente Autocomplete, el valor que recibe esta función esta compuesto por un  id y label
 */
interface Props<T, TField extends FieldValues> {
  control: Control<TField>;
  label: string;
  name: Path<TField>;
  fetchData?: FetchData<T>;
  data?: T[];
  optId: string | ((item: T) => T[keyof T]);
  optLabel: string | ((item: T) => string);
  disabled?: boolean;
  onChange?: (e: React.SyntheticEvent<Element, Event>, value: readonly T[] | null) => void;
  multiAutocompleteProps?: object;
}

const FormMultiSelect = <T, TField extends FieldValues>({
  control,
  label,
  name,
  fetchData,
  data,
  optId,
  optLabel,
  disabled = false,
  onChange,
  multiAutocompleteProps,
}: Props<T, TField>) => {
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
        field: { onChange: cOnChange, onBlur, value },
        formState: { errors },
      }) => (
        <Autocomplete
          loading={fetchData?.isLoading}
          disabled={disabled}
          multiple
          filterSelectedOptions
          options={fetchData?.data?.content || data || []}
          getOptionLabel={optionLabel}
          isOptionEqualToValue={(option, value) =>
            optionId(option) === optionId(value)
          }
          onChange={(_, value) => {
            cOnChange(value);
            if (onChange) {
              onChange(_, value);
            }
          }}
          value={value}
          renderOption={(props, option) => {
            return (
              <li {...props} key={String(optionId(option))}>
                {optionLabel(option)}
              </li>
            );
          }}
          renderTags={(tagValue, getTagProps) => {
            return tagValue.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={String(optionId(option))}
                label={optionLabel(option)}
                
              />
            ));
          }}
          {...multiAutocompleteProps}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={label}
              name={name}
              fullWidth
              onBlur={onBlur}
              error={!!errors[name]}
              helperText={String(errors[name]?.message ?? "")}
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
};

export default FormMultiSelect;
