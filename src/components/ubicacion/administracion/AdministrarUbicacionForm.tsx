"use client"

import { useEquipoService } from "@/services/Equipo.service";
import { useEquiposTrabajoService } from "@/services/EquiposTrabajo.service";
import { useUbicacionService } from "@/services/Ubicacion.service";
import { useFetchApi } from "@/utils/hooks/useFetchApi";
import { Box, Button, Card, CardContent, Divider, Grid, Paper, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import React, { useState } from "react";
import { UbicacionConEquipos } from "@/interface/Ubicacion.interface";
import { useNotification } from "@/utils/hooks/useNotification";
import { Equipo } from "@/interface/Equipo.interface";
import { EquiposTrabajo } from "@/interface/EquiposTrabajo.interface";
import BotonVolver from "@/utils/components/BotonVolver";
import FormAutocomplete from "@/components/ui/form/FormAutocomplete";
import EquipoTable from "../details/EquipoTable";
import EquiposTrabajoTable from "../details/EquiposTrabajoTable";


const AdministrarUbicacionForm = ({ ubicacion }: { ubicacion: UbicacionConEquipos }) => {
  const ubicacionService = useUbicacionService();
  const equiposTrabajoService = useEquiposTrabajoService();
  const equipoService = useEquipoService();

  const [data, setData ] = useState<UbicacionConEquipos>(ubicacion);

  const { notiSuccess, notiApiResponseError } = useNotification();
    const router = useRouter();
    const { control, handleSubmit, getValues } = useForm({
      defaultValues: {
        equipos: undefined,
        equiposTrabajo: undefined,
      },  
    });

    const handleAgregar = (values: any) => {
      if(values.equipos){
        agregarEquipo(values.equipos)
      }
      if(values.equiposTrabajo){
        agregarEquipoTrabajo(values.equiposTrabajo)
      }
    }

    const agregarEquipo = (equipo: Equipo) => {
      if(equipo !== null && data !== null){
        if(!(data.equipos.some((eq) => eq.id === equipo.id))){
          const finalEquipo = {
            ...equipo,
            ubicacion: {
              ...equipo.ubicacion,
              id: data.id,
              nombre: data.nombre,
              facultad: data.facultad
            },
          };
          setData({...data, equipos: [...data.equipos, finalEquipo]})
        }
      }
    }

    const agregarEquipoTrabajo = (equipoTrabajo: EquiposTrabajo) => {
      if(equipoTrabajo !== null && data !== null){
        if(!(data.equiposTrabajo.some(et => et.id === equipoTrabajo.id))){
          const finalEquipoTrabajo = {
            ...equipoTrabajo,
            ubicacion: {
              ...equipoTrabajo.ubicacion,
              id: data.id,
              nombre: data.nombre,
              facultad: data.facultad
            }
          }
          setData({...data, equiposTrabajo: [...data.equiposTrabajo, finalEquipoTrabajo]})
        }
      }
    };

    const removerEquipo = (id: number) => {
      if(data){
        const arrayEquiposActualizado = [...data.equipos];
        const equipoIndex = arrayEquiposActualizado.findIndex(equipo => equipo.id === id);
        arrayEquiposActualizado[equipoIndex].ubicacion = null;
        setData({...data, equipos: arrayEquiposActualizado})
      }
    }

    const removerEquipoTrabajo = (id: number) => {
      if(data){
        const arrayEquiposTrabajoActualizado = [...data.equiposTrabajo];
        const equipoTrabajoIndex = arrayEquiposTrabajoActualizado.findIndex(equipoTrabajo => equipoTrabajo.id === id);
        arrayEquiposTrabajoActualizado[equipoTrabajoIndex].ubicacion = null;
        setData({...data, equiposTrabajo: arrayEquiposTrabajoActualizado})
      }
    }

    const equiposData = useFetchApi<Equipo>({service: equipoService, params: {size: "100", estado: "Stock"}});
    const equiposTrabajoData = useFetchApi<EquiposTrabajo>({service: equiposTrabajoService, params: {size: "100", estado: "Stock"}});

    const onSubmit = (values: any) => {
      ubicacionService.administrarUbicacion(data)
      .then((response) => {
        notiSuccess("Ubicación administrada exitosamente");
        router.push("/ubicaciones");
      })
      .catch(error => {
        notiApiResponseError(error)
      })
    }
  return (
    <Paper elevation={2} sx={{ padding: "16px", width: "calc(100%-16px)" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>ADMINISTRAR UBICACIÓN {data?.nombre}</h3>
          <BotonVolver href="/ubicaciones" />
        </Box>
        <Divider />
        <Stack>
          <Card elevation={0} sx={{ maxWidth: "600PX", margin: "auto" }}>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
                  <Grid item xs={6} lg={12}>
                    <FormAutocomplete
                      optId={"id"}
                      fetchData={equiposData}
                      optLabel={"nombre"}
                      control={control}
                      name="equipos"
                      label="Equipos"
                    />
                  </Grid>
                  <Grid item xs={6} lg={12}>
                    <FormAutocomplete
                      optId={"id"}
                      fetchData={equiposTrabajoData}
                      optLabel={(item) =>
                        item.modelo.nombre + " - " + item.serie
                      }
                      control={control}
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
                        data?.equipos.length === 0 &&
                        data?.equiposTrabajo.length === 0
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
              data={data?.equipos.filter((equipo) => equipo.ubicacion !== null)}
              onDelete={removerEquipo}
              acciones={true}
            />
            <EquiposTrabajoTable
              data={data?.equiposTrabajo.filter(
                (equipoTrabajo) => equipoTrabajo.ubicacion !== null
              )}
              onDelete={removerEquipoTrabajo}
              acciones={true}
            />
          </Stack>
        </Stack>
      </Paper>
  )
};

export default AdministrarUbicacionForm;
