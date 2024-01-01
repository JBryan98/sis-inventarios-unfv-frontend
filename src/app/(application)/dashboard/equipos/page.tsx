"use client"

import { cardData } from '@/components/dashboard/card/CardData';
import DashboardCard from '@/components/dashboard/card/DashboardCard';
import EquiposBySistemaOperativoTable from '@/components/dashboard/table/EquiposBySistemaOperativoTable';
import TopFacultadesTable from '@/components/dashboard/table/TopFacultadesTable';
import { EquiposDashboard } from '@/interface/Dashboard.interface';
import { useDashboardService } from '@/services/Dashboard.service'
import { useFetchData } from '@/utils/hooks/useFetchApi';
import { Box, Grid } from '@mui/material';
import React from 'react'

const EquiposDashboardPage = () => {
  const dashboardService = useDashboardService();
  const equiposData = useFetchData<EquiposDashboard, typeof dashboardService>({
    service: dashboardService,
    fetchMethod: "getEquiposDasboard",
  });

  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      {equiposData.isLoading ? (
        "Cargando .."
      ) : (
        <>
          <Grid container columns={{ xs: 6, lg: 12 }} spacing={2}>
            {cardData(equiposData.data!.estado).map((card) => (
              <Grid key={card.title} item xs={6} lg={3}>
                <DashboardCard
                  title={card.title}
                  subtitle={card.subtitle}
                  icon={card.icon}
                  cardBackgroundColor={card.cardBackgroundColor}
                  iconBackgroundColor={card.iconBackgroundColor}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container columns={{ xs: 6, lg: 12 }} spacing={2}>
          <Grid item xs={6} lg={6}>
              <TopFacultadesTable
                data={equiposData.data?.top5FacultadesByEquiposCount}
                title="Top Facultades"
                subtitle="Facultades con mayor cantidad de equipos registrados"
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <EquiposBySistemaOperativoTable
                data={equiposData.data?.countEquiposBySistemaOperativo}
                title="Top Sistema Operativo"
                subtitle="Sistemas operativos con mayor cantidad de equipos registrados"
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default EquiposDashboardPage;