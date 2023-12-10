"use client"
import EquipoHardwareTable from '@/components/equipos/details/EquipoHardwareTable';
import EquipoSoftwareTable from '@/components/equipos/details/EquipoSoftwareTable';
import { EquipoConComponentes } from '@/interface/EquipoConComponentes';
import equipoService from '@/services/Equipo.service'
import BotonVolver from '@/utils/components/BotonVolver';
import { useFetchApi2 } from '@/utils/hooks/useFetchApi';
import { Box, Paper, Stack } from '@mui/material'
import ComputerIcon from '@mui/icons-material/Computer';
import RoomIcon from "@mui/icons-material/Room";
import ApartmentIcon from "@mui/icons-material/Apartment";

const EquipoDetalles = ({params}: {params: {id: string}}) => {
    const {data} = useFetchApi2<EquipoConComponentes>(equipoService.url + "/" + params.id);
    return (
      <Paper sx={{ width: "calc(100%-16px)", padding: 2 }} elevation={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{display: "flex", alignItems: "center", gap:"8px"}}>
            <ComputerIcon />
            <h3>{data?.nombre}</h3>
          </Box>
          <BotonVolver href="/equipos" />
        </Box>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <RoomIcon sx={{marginBottom: "3px"}}/>
        <h4>
          {data?.ubicacion ? data?.ubicacion?.nombre : "No asignado"}
        </h4>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <ApartmentIcon sx={{marginBottom: "6px"}}/>
        <h4>
          {data?.ubicacion ? data?.ubicacion?.facultad.abreviatura + " - " + data?.ubicacion?.facultad.nombre : "No asignado"}
        </h4>
        </Stack>
        <EquipoHardwareTable data={data?.hardware} />
        <EquipoSoftwareTable data={data?.software} />
      </Paper>
    );
}

export default EquipoDetalles