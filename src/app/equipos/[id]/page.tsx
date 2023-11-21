"use client"
import EquipoHardwareTable from '@/components/equipos/details/EquipoHardwareTable';
import EquipoSoftwareTable from '@/components/equipos/details/EquipoSoftwareTable';
import { EquipoConComponentes } from '@/interface/EquipoConComponentes';
import equipoService from '@/services/Equipo.service'
import BotonVolver from '@/utils/components/BotonVolver';
import { useFetchApi2 } from '@/utils/hooks/useFetchApi';
import { Box, Paper } from '@mui/material'
import ComputerIcon from '@mui/icons-material/Computer';

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
        <h4>
          {data?.ubicacion?.nombre ? data.ubicacion.nombre : "Sin asignar"}
        </h4>
        <EquipoHardwareTable data={data?.hardware} />
        <EquipoSoftwareTable data={data?.software} />
      </Paper>
    );
}

export default EquipoDetalles