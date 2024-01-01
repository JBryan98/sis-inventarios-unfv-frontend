import { Avatar, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react'

interface Props {
  title: string;
  subtitle: string | number;
  icon: JSX.Element;
  cardBackgroundColor: string;
  iconBackgroundColor: string;
}

const DashboardCard = ({title, subtitle, icon, cardBackgroundColor, iconBackgroundColor}: Props) => {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        backgroundColor: cardBackgroundColor,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px"
      }}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{subtitle}</Typography>
      </CardContent>
      <CardMedia>
        <Avatar sx={{ bgcolor: iconBackgroundColor, height: "72px", width: "72px"}}>
            {icon}
        </Avatar>
      </CardMedia>
    </Card>
  );
};

export default DashboardCard