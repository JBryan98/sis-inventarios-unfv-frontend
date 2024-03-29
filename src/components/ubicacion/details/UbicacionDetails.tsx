"use client"

import { Box, Paper, Stack } from "@mui/material";
import React from "react";
import BotonVolver from "@/utils/components/BotonVolver";
import EquipoTable from "@/components/ubicacion/details/EquipoTable";
import EquiposTrabajoTable from "@/components/ubicacion/details/EquiposTrabajoTable";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RoomIcon from "@mui/icons-material/Room";
import { UbicacionConEquipos } from "@/interface/Ubicacion.interface";

const UbicacionDetails = ({ data }: { data: UbicacionConEquipos }) => {
  return (
    <Paper
      sx={{
        width: "calc(100%-16px)",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      elevation={2}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <RoomIcon sx={{ marginBottom: "3px" }} />
          <h3>{data.nombre}</h3>
        </Stack>
        <BotonVolver href="/ubicaciones" />
      </Box>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <ApartmentIcon sx={{ marginBottom: "5px" }} />
        <h3>{data.facultad ? data.facultad.nombre : "Sin asignar"}</h3>
      </Stack>
      <EquipoTable data={data.equipos} />
      <EquiposTrabajoTable data={data.equiposTrabajo} />
    </Paper>
  );
};

export default UbicacionDetails;
