import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import AdministrarUbicacionForm from "@/components/ubicacion/administracion/AdministrarUbicacionForm";
import { UbicacionConEquipos } from "@/interface/Ubicacion.interface";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

const getUbicacion = async (nombre: string): Promise<UbicacionConEquipos> => {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ubicaciones/${nombre}`,
    {
      headers: {
        Authorization: "Bearer " + session?.user.token,
      },
    }
  );
  return await response.json();
};

interface Props {
  params: {
    nombre: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ubicacion = await getUbicacion(params.nombre);
  return {
    title: `${ubicacion.nombre} | Administrar`,
  };
}

const AdministrarUbicacion = async ({ params }: Props) => {
  const data = await getUbicacion(params.nombre);
  return <AdministrarUbicacionForm ubicacion={data} />;
};

export default AdministrarUbicacion;
