"use client";

import FormAutocomplete from "@/components/ui/form/FormAutocomplete";
import { Hardware } from "@/interface/Hardware.interface";
import { Software } from "@/interface/Software.interface";
import hardwareService from "@/services/Hardaware.service";
import softwareService from "@/services/Software.service";
import { useFetchApi, useFetchApi2 } from "@/utils/hooks/useFetchApi";
import { Box, Button, Card, CardContent, Divider, Grid, Paper, Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { EquipoConComponentes, EquipoRequest } from "@/interface/EquipoConComponentes";
import { useRouter } from "next/navigation";
import equipoService from "@/services/Equipo.service";
import { useNotification } from "@/utils/hooks/useNotification";
import EquipoHardwareTable from "@/components/equipos/details/EquipoHardwareTable";
import EquipoSoftwareTable from "@/components/equipos/details/EquipoSoftwareTable";
import BotonVolver from "@/utils/components/BotonVolver";

const AdministrarEquipoPage = ({params}: {params: {nombre: string}}) => {
  const { notiSuccess, notiApiResponseError } = useNotification();
  const {data, setData} = useFetchApi2<EquipoConComponentes>(equipoService.url + "/" + params.nombre);
  const router = useRouter();
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      hardware: undefined,
      software: undefined,
    },
  });

  console.log(data)

  const handleAgregar = (values: any) => {
    console.log(values)
    if (values.hardware) {
      agregarHardawre(values.hardware);
    }
    if (values.software) {
      agregarSoftware(values.software);
    }
  };

  const agregarHardawre = (hardware: Hardware) => {
    if (hardware && data) {
      if (!(data.hardware.some((hw) => hw.id === hardware.id))) {
        const finalHardware = {...hardware, equipo: {
          ...hardware.equipo,
          id: data.id,
          nombre: data.nombre,
          estado: data.estado,
          ubicacion: data.ubicacion
        }}
        const finalData = {
          ...data,
          hardware: [
            ...data.hardware,
            finalHardware
          ],
        };
        setData(finalData);
      }
    }
  };

  const agregarSoftware = (software: Software) => {
    if (software && data) {
      if (!(data.software.some((sw) => sw.id === software.id))){
        const finalData = { ...data, software: [...data.software, software] }
        setData(finalData);
      }
    }
  };

  const removerHardware = (id: number) => {
    if(data){
        const hardwareActualizado = [...data.hardware];
        const hardwareIndex = hardwareActualizado.findIndex(hardware => hardware.id === id);
        if(hardwareActualizado[hardwareIndex].estado === "Stock"){
          setData({
            ...data,
            hardware: hardwareActualizado.filter(hw => hw.id !== id),
          })
        }else{
          hardwareActualizado[hardwareIndex].equipo = null;
          setData({...data, hardware: hardwareActualizado})
        }
    }
  };

  const removerSoftware = (id: number) => {
    if (data) {
      const softwareActualizado = data.software.filter((software) => software.id !== id);
      setData({ ...data, software: softwareActualizado });
    }
  };

  const softwareData = useFetchApi<Software>(softwareService.url);
  const hardwareData = useFetchApi<Hardware>(
    hardwareService.url + "?estado=stock&size=500"
  );

  const onSubmit = (values: any) => {
    equipoService
    .administrarEquipo(data as EquipoRequest)
    .then(() => {
      notiSuccess("Equipo actualizado con éxito");
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
          <h3>ADMINISTRAR EQUIPO {data?.nombre}</h3>
          <BotonVolver href="/equipos"/>
        </Box>
        <Divider />
        <Stack>
          <Card elevation={0} sx={{ maxWidth: "600PX", margin: "auto" }}>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
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
                        item.serie +
                        " - " +
                        item.modelo.subcategoria.nombre +
                        " " +
                        item.modelo.nombre
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
                        data?.hardware.length === 0 &&
                        data?.software.length === 0
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
          <EquipoHardwareTable data={data?.hardware.filter(hardware => hardware.equipo !== null)} onDelete={removerHardware} acciones={true}/>
          <EquipoSoftwareTable data={data?.software} acciones={true} onDelete={removerSoftware}/>
        </Stack>
      </Paper>
  );
};

export default AdministrarEquipoPage;
