import React from 'react'
import { TextField, TextFieldProps } from "@mui/material"
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface Props<TField extends FieldValues>{
    control: Control<TField>;
    label: string;
    name: Path<TField>;
    textFieldProps?: TextFieldProps;
}

const InputForm = <TField extends FieldValues>({control, label, name, textFieldProps}: Props<TField>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        formState: { errors },
      }) => (
        <TextField
          inputRef={ref}
          autoComplete="off"
          variant="outlined"
          label={label}
          name={name}
          value={value || ""}
          fullWidth
          onBlur={onBlur}
          onChange={onChange}
          error={!!errors[name]}
          helperText={String(errors[name]?.message ?? "")}
          {...textFieldProps}
        />
      )}
    />
  );
}

export default InputForm