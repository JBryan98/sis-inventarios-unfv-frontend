import { Search } from '@mui/icons-material';
import { Button, Grid } from '@mui/material'
import React from 'react'

const FilterFormButtons = () => {
  return (
    <>
      <Grid item xs={6} lg={4}>
        <Button type='submit' color='primary' startIcon={<Search/>}>Filtrar</Button>
      </Grid>
      <Grid item xs={6} lg={4}>
        <Button color='secondary' startIcon={<Search/>}>Limpiar</Button>
      </Grid>
      <Grid item xs={6} lg={4}>
        <Button color='error' startIcon={<Search/>}>Cancelar</Button>
      </Grid>
    </>
  );
}

export default FilterFormButtons