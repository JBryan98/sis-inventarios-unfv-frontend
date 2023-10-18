import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface Props<TField extends FieldValues>{
    control: Control<TField>;
    label: string;
    name: Path<TField>;
    options: string[];
}

const FormSelect = <TField extends FieldValues>({ control, label, name, options }: Props<TField>) => {
  return (
    <Controller
       control={control}
       name={name}
       render={({ field: { value, onChange, ref}, formState: { errors }}) => (
        <FormControl fullWidth error={!!errors[name]}>
            <InputLabel>{label}</InputLabel>
            <Select value={value} label={label} onChange={onChange} ref={ref}>
                {options.map(option => (
                    <MenuItem value={option} key={option}>{option}</MenuItem>
                ))}
            </Select>
            {!!errors[name] && (
                <FormHelperText>{String(errors[name]?.message)}</FormHelperText>
            )}
        </FormControl>
       )} 
    />
  )
}

export default FormSelect