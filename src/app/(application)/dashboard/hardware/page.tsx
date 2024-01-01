"use client";

import { cardData } from "@/components/dashboard/card/CardData";
import DashboardCard from "@/components/dashboard/card/DashboardCard";
import TopMarcasTable from "@/components/dashboard/table/TopMarcasTable";
import TopModelosTable from "@/components/dashboard/table/TopModelosTable";
import { HardwareDashboard } from "@/interface/Dashboard.interface";
import { useDashboardService } from "@/services/Dashboard.service";
import { useFetchData } from "@/utils/hooks/useFetchApi";
import { Box, Grid } from "@mui/material";
import React from "react";

const HardwareDashboardPage = () => {
  const dashboardService = useDashboardService();
  const hardwareData = useFetchData<HardwareDashboard, typeof dashboardService>(
    { service: dashboardService, fetchMethod: "getHardwareDashboard" }
  );

  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      {hardwareData.isLoading ? (
        "Cargando .."
      ) : (
        <>
          <Grid container columns={{ xs: 6, lg: 12 }} spacing={2}>
            {cardData(hardwareData.data!.estado).map((card) => (
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
              <TopMarcasTable
                data={hardwareData.data?.top5HardwareByMarca}
                title="Top Marcas"
                subtitle="Marcas con mayor cantidad de hardware registrados"
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <TopModelosTable
                data={hardwareData.data?.top5HardwareByModelo}
                title="Top Modelos"
                subtitle="Modelos con mayor cantidad de hardware registrados"
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default HardwareDashboardPage;
