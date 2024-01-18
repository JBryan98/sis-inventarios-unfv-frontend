"use client"

import { CrearUbicacionForm, crearUbicacionSchema } from '@/components/ubicacion/form/CrearEquipoValidation';
import { Equipo } from '@/interface/Equipo.interface';
import { EquiposTrabajo } from '@/interface/EquiposTrabajo.interface';
import { ubicacionReducer, ubicacionReducerInitialState } from '@/reducer/UbicacionReducer';
import { useNotification } from '@/utils/hooks/useNotification'
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useReducer } from 'react'
import { useForm } from 'react-hook-form';
import { Box, Button, Card, CardContent, Container, Divider, Grid, Paper, Stack } from "@mui/material";
import BotonVolver from '@/utils/components/BotonVolver';
import InputForm from '@/components/ui/form/InputForm';
import { useFetchApi } from '@/utils/hooks/useFetchApi';
import { useEquipoService } from '@/services/Equipo.service';
import { useEquiposTrabajoService } from '@/services/EquiposTrabajo.service';
import { Facultad } from '@/interface/Facultad.interface';
import { useFacultadService } from '@/services/Facultad.service';
import FormAutocomplete from '@/components/ui/form/FormAutocomplete';
import EquipoTable from '@/components/ubicacion/details/EquipoTable';
import EquiposTrabajoTable from '@/components/ubicacion/details/EquiposTrabajoTable';
import { useUbicacionService } from '@/services/Ubicacion.service';
import { UbicacionRequest } from '@/interface/Ubicacion.interface';

const CrearUbicacion = () => {
    const ubicacionService = useUbicacionService();
    const equiposTrabajoService = useEquiposTrabajoService();
    const equipoService = useEquipoService();
    const facultadService = useFacultadService();

    const { notiSuccess, notiApiResponseError } = useNotification();
    const router = useRouter();
    const [state, dispatch] = useReducer(ubicacionReducer, ubicacionReducerInitialState);
    const { control, handleSubmit, getValues } = useForm<CrearUbicacionForm>({
        defaultValues: {
          nombre: "",
          facultad: undefined,
          equipos: undefined,
          equiposTrabajo: undefined,
        },
        resolver: yupResolver(crearUbicacionSchema)
      });

      const handleAgregar = (values: any) => {
        if(values.equipos) {
            agregarEquipo(values.equipos)
        }
        if(values.equiposTrabajo) {
            agregarEquipoTrabajo(values.equiposTrabajo)
        }
      }

      const agregarEquipo = (equipo: Equipo) => {
        if(equipo !== null) {
            if(!(state.equipos.filter(eq => eq.id === equipo.id).length > 0)){
                dispatch({type: "AGREGAR_EQUIPO", payload: equipo})
            }
        }
      }

      const agregarEquipoTrabajo = (equipoTrabajo: EquiposTrabajo) => {
        if(equipoTrabajo !== null) {
            if(!(state.equiposTrabajo.filter(et => et.id === equipoTrabajo.id).length > 0)){
                dispatch({type: "AGREGAR_EQUIPOS_TRABAJO", payload: equipoTrabajo})
            }
        }
      }

      const removerEquipo = (id: number) =>{
        const arrayUpdated = state.equipos.filter(eq => eq.id !== id)
        dispatch({type: "REMOVER_EQUIPO", payload: arrayUpdated})
      }

      const removerEquipoTrabajo = (id: number) =>{
        const arrayUpdated = state.equiposTrabajo.filter(et => et.id !== id)
        dispatch({type: "REMOVER_EQUIPOS_TRABAJO", payload: arrayUpdated})
      }

      const onSubmit = (values: CrearUbicacionForm) => {
        const finalObj = {
          ...values,
          equipos: state.equipos,
          equiposTrabajo: state.equiposTrabajo,
        };
        ubicacionService
          .create(finalObj as UbicacionRequest)
          .then(() => {
            notiSuccess("Ubicacion creada con éxito");
            router.push("/ubicaciones");
          })
          .catch((error) => {
            notiApiResponseError(error);
          });
      };

      const equiposData = useFetchApi<Equipo>({service: equipoService, params: {estado: "Stock", size: "500"}})
      const equiposTrabajoData = useFetchApi<EquiposTrabajo>({service: equiposTrabajoService, params: {estado: "Stock", size: "500"}})
      const facultadData = useFetchApi<Facultad>({service: facultadService, params: {size: "100"}})

  return (
    <Container>
      <Paper elevation={2} sx={{ padding: "16px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>CREAR UBICACIÓN</h3>
          <BotonVolver href="/ubicaciones" />
        </Box>
        <Divider />
        <Stack>
          <Card elevation={0} sx={{ maxWidth: "600px", margin: "auto" }}>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
                  <Grid item xs={6} lg={12}>
                    <InputForm control={control} name="nombre" label="Nombre" />
                  </Grid>
                  <Grid item xs={6} lg={12}>
                    <FormAutocomplete
                      optId={"id"}
                      optLabel={(item: Facultad) =>
                        item.abreviatura + " - " + item.nombre
                      }
                      control={control}
                      fetchData={facultadData}
                      name="facultad"
                      label="Facultad"
                    />
                  </Grid>
                  <Grid item xs={6} lg={12}>
                    <FormAutocomplete
                      optId={"id"}
                      optLabel={"nombre"}
                      control={control}
                      fetchData={equiposData}
                      name="equipos"
                      label="Equipos"
                    />
                  </Grid>
                  <Grid item xs={6} lg={12}>
                    <FormAutocomplete
                      optId={"id"}
                      optLabel={(item: EquiposTrabajo) =>
                        item.modelo.nombre + " - " + item.serie
                      }
                      control={control}
                      fetchData={equiposTrabajoData}
                      name="equiposTrabajo"
                      label="Equipos de Trabajo"
                    />
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <Button
                      onClick={() => handleAgregar(getValues())}
                      color="success"
                      variant="contained"
                      fullWidth
                    >
                      Agregar
                    </Button>
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                      disabled={
                        state.equipos.length === 0 &&
                        state.equiposTrabajo.length === 0 &&
                        state.nombre === "" &&
                        state.facultad === undefined
                      }
                    >
                      Finalizar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
          <Stack spacing={2}>
            <Divider />
            <EquipoTable
              data={state.equipos}
              acciones={true}
              onDelete={removerEquipo}
            />
            <EquiposTrabajoTable
              data={state.equiposTrabajo}
              acciones={true}
              onDelete={removerEquipoTrabajo}
            />
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}

export default CrearUbicacion