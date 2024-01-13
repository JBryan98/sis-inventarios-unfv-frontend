import { cardData } from "@/components/dashboard/card/CardData";
import DashboardCard from "@/components/dashboard/card/DashboardCard";
import TopMarcasTable from "@/components/dashboard/table/TopMarcasTable";
import TopModelosTable from "@/components/dashboard/table/TopModelosTable";
import { getHardwareDashboard } from "@/services/Dashboard.service";
import { Box, Grid } from "@mui/material";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Hardware",
}

const HardwareDashboardPage = async () => {
  const hardwareData = await getHardwareDashboard();

  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <Grid container columns={{ xs: 6, lg: 12 }} spacing={2}>
        {cardData(hardwareData.estado).map((card) => (
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
            data={hardwareData.top5HardwareByMarca}
            title="Top Marcas"
            subtitle="Marcas con mayor cantidad de hardware registrados"
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <TopModelosTable
            data={hardwareData.top5HardwareByModelo}
            title="Top Modelos"
            subtitle="Modelos con mayor cantidad de hardware registrados"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HardwareDashboardPage;
