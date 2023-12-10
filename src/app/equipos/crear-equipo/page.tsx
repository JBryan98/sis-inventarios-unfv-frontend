"use client";

import FormAutocomplete from "@/components/ui/form/FormAutocomplete";
import { Hardware } from "@/interface/Hardware.interface";
import { Software } from "@/interface/Software.interface";
import { equipoReducer, equipoReducerInitialState } from "@/reducer/EquipoReducer";
import hardwareService from "@/services/Hardaware.service";
import softwareService from "@/services/Software.service";
import { useFetchApi } from "@/utils/hooks/useFetchApi";
import { Box, Button, Card, CardContent, Divider, Grid, Paper, Stack } from "@mui/material";
import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import InputForm from "@/components/ui/form/InputForm";
import { EquipoRequest } from "@/interface/EquipoConComponentes";
import { yupResolver } from "@hookform/resolvers/yup";
import { equipoSchema } from "@/components/equipos/form/CrearEquipoValidation";
import { useRouter } from "next/navigation";
import equipoService from "@/services/Equipo.service";
import { useNotification } from "@/utils/hooks/useNotification";
import BotonVolver from "@/utils/components/BotonVolver";
import EquipoHardwareTable from "@/components/equipos/details/EquipoHardwareTable";
import EquipoSoftwareTable from "@/components/equipos/details/EquipoSoftwareTable";

const CrearEquipo = () => {
  const { notiSuccess, notiApiResponseError } = useNotification();
  const router = useRouter();
  const [state, dispatch] = useReducer(equipoReducer, equipoReducerInitialState);
  const { control, handleSubmit, setError, setValue, reset, getValues } = useForm({
    defaultValues: {
      nombre: "",
      hardware: undefined,
      software: undefined,
    },
    resolver: yupResolver(equipoSchema)
  });

  const handleAgregar = (values: any) => {
    if (values.hardware) {
      agregarHardawre(values.hardware);
    }
    if (values.software) {
      agregarSoftware(values.software);
    }
  };

  const agregarHardawre = (hardware: Hardware) => {
    if (hardware !== null) {
      if (!(state.hardware.filter((hw) => hw.id === hardware.id).length > 0)) {
        dispatch({ type: "AGREGAR_HARDWARE", payload: hardware });
      }
    }
  };

  const agregarSoftware = (software: Software) => {
    if (software !== null) {
      if (!(state.software.filter((sw) => sw.id === software.id).length > 0))
        dispatch({ type: "AGREGAR_SOFTWARE", payload: software });
    }
  };

  const removerHardware = (id: number) => {
    const arrayUpdated = state.hardware.filter(
      (hardware) => hardware.id !== id
    );
    dispatch({ type: "REMOVER_HARDWARE", payload: arrayUpdated });
  };

  const removerSoftware = (id: number) => {
    const arrayUpdated = state.software.filter(
      (software) => software.id !== id
    );
    dispatch({ type: "REMOVER_SOFTWARE", payload: arrayUpdated });
  };

  const softwareData = useFetchApi<Software>(softwareService.url);
  const hardwareData = useFetchApi<Hardware>(
    hardwareService.url + "?estado=stock&size=500"
  );

  const onSubmit = (values: any) => {
    const finalObj = {
      ...values,
      hardware: state.hardware,
      software: state.software
    }
    alert(JSON.stringify({finalObj}, null, 2))
    equipoService
    .create(finalObj as EquipoRequest)
    .then(() => {
      notiSuccess("Equipo creado con éxito");
      router.push("/equipos")
    })
    .catch(error => {
      notiApiResponseError(error);
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
          <h3>CREAR EQUIPO</h3>
          <BotonVolver href="/equipos"/>
        </Box>
        <Divider />
        <Stack>
          <Card elevation={0} sx={{ maxWidth: "600PX", margin: "auto" }}>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
                  <Grid item xs={6} lg={12}>
                    <InputForm control={control} name="nombre" label="Nombre" />
                  </Grid>
                  <Grid item xs={6} lg={12}>
                    <FormAutocomplete
                      optId={"id"}
                      fetchData={softwareData}
                      optLabel={"nombre"}
                      control={control}
                      name="software"
                      label="Software"
                    />
                  </Grid>
                  <Grid item xs={6} lg={12}>
                    <FormAutocomplete
                      optId={"id"}
                      fetchData={hardwareData}
                      optLabel={(item) =>
                        item.modelo.subcategoria.nombre +
                        " " +
                        item.modelo.nombre +
                        " - " +
                        item.serie
                      }
                      control={control}
                      name="hardware"
                      label="Hardware"
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
                        state.hardware.length === 0 &&
                        state.software.length === 0 &&
                        state.nombre === ""
                      }
                    >
                      Finalizar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
          <Divider />
          <EquipoHardwareTable data={state.hardware} acciones={true} onDelete={removerHardware}/>
          <EquipoSoftwareTable data={state.software} acciones={true} onDelete={removerSoftware}/>
        </Stack>
      </Paper>
  );
};

export default CrearEquipo;
