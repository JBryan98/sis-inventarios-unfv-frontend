import { Checkbox, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props<TField extends FieldValues>{
    control: Control<TField>;
    label: string;
    name: Path<TField>;
    options: string[];
}

const FormCheckmark = <TField extends FieldValues>({ control, label, name, options }: Props<TField>) => {  
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <FormControl fullWidth error={!!errors[name]}>
            <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={value}
              onChange={onChange}
              input={<OutlinedInput label={label} />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={value.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
            {!!errors[name] && (
            <FormHelperText error>{String(errors[name]?.message)}</FormHelperText>
          )}
          </FormControl>
        )}
      />
    );
}

export default FormCheckmark