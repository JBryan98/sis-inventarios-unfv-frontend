"use client";

import { UbicacionConEquipos } from "@/interface/Ubicacion.interface";
import ubicacionService from "@/services/Ubicacion.service";
import { useFetchApi2 } from "@/utils/hooks/useFetchApi";
import { Box, Paper, Stack } from "@mui/material";
import React from "react";
import BotonVolver from "@/utils/components/BotonVolver";
import EquipoTable from "@/components/ubicacion/details/EquipoTable";
import EquiposTrabajoTable from "@/components/ubicacion/details/EquiposTrabajoTable";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RoomIcon from "@mui/icons-material/Room";

const UbicacionDetalles = ({ params }: { params: { id: string } }) => {
  const { data } = useFetchApi2<UbicacionConEquipos>(
    ubicacionService.url + "/" + params.id
  );
  return (
    <Paper sx={{ width: "calc(100%-16px)", padding: 2 }} elevation={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <RoomIcon sx={{marginBottom: "3px"}}/>
          <h3>{data?.nombre}</h3>
        </Stack>
        <BotonVolver href="/ubicaciones" />
      </Box>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <ApartmentIcon sx={{marginBottom: "5px"}}/>
        <h3>{data?.facultad?.nombre ? data.facultad.nombre : "Sin asignar"}</h3>
      </Stack>
      <EquipoTable data={data?.equipos} />
      <EquiposTrabajoTable data={data?.equiposTrabajo} />
    </Paper>
  );
};

export default UbicacionDetalles;
