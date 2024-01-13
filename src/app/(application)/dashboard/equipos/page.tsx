import { cardData } from "@/components/dashboard/card/CardData";
import DashboardCard from "@/components/dashboard/card/DashboardCard";
import EquiposBySistemaOperativoTable from "@/components/dashboard/table/EquiposBySistemaOperativoTable";
import TopFacultadesTable from "@/components/dashboard/table/TopFacultadesTable";
import { getEquiposDasboard } from "@/services/Dashboard.service";
import { Box, Grid } from "@mui/material";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Equipos",
};

const EquiposDashboardPage = async () => {
  const equiposData = await getEquiposDasboard();
  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <Grid container columns={{ xs: 6, lg: 12 }} spacing={2}>
        {cardData(equiposData.estado).map((card) => (
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
            data={equiposData.top5FacultadesByEquiposCount}
            title="Top Facultades"
            subtitle="Facultades con mayor cantidad de equipos registrados"
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <EquiposBySistemaOperativoTable
            data={equiposData.countEquiposBySistemaOperativo}
            title="Top Sistema Operativo"
            subtitle="Sistemas operativos con mayor cantidad de equipos registrados"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EquiposDashboardPage;
