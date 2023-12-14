"use client"

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React, { useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import KeyIcon from '@mui/icons-material/Key';

interface Props<TField extends FieldValues>{
    control: Control<TField>;
    label: string;
    name: Path<TField>;
    textFieldProps?: TextFieldProps;
    startIcon?:boolean;
}

const PasswordInput = <TField extends FieldValues>({control, label, name, startIcon, textFieldProps}: Props<TField>) => {
    const [ showPassword, setShowPassword ] = useState<boolean>(false); 

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
          type={showPassword ? "text" : "password"}
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
          InputProps={{
            startAdornment: (
                <InputAdornment position='start'>
                    {startIcon && <KeyIcon/>}
                </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...textFieldProps}
        />
      )}
    />
  );
}

export default PasswordInput