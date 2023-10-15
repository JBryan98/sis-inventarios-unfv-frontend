import { Button, Grid } from '@mui/material';
import React from 'react'

interface Props {
    handleClose: () => void;
    lblConfirm?: string;
}

const FormButtons = ({handleClose, lblConfirm}: Props) => {
  return (
    <>
      <Grid item xs={6} lg={6}>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleClose}
        >
          Cancelar
        </Button>
      </Grid>
      <Grid item xs={6} lg={6}>

        <Button variant="contained" color="success" type="submit" fullWidth>
          {lblConfirm || "Aceptar"}
        </Button>
        </Grid>
    </>
  );
}

export default FormButtons