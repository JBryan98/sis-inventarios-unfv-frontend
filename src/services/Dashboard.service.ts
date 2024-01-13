import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import {
  EquiposDashboard,
  EquiposTrabajoDashboard,
  HardwareDashboard,
} from "@/interface/Dashboard.interface";
import { HttpStatus } from "@/utils/constants/HttpResponse";
import { getServerSession } from "next-auth";

const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard`;

export async function getHardwareDashboard(): Promise<HardwareDashboard> {
  const session = await getServerSession(authOptions);
  const response = await fetch(url + "/hardware", {
    headers: {
      Authorization: "Bearer " + session?.user.token,
    },
  });
  if (response.status !== HttpStatus.OK) {
    const error = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}

export async function getEquiposTrabajoDashboard(): Promise<EquiposTrabajoDashboard> {
  const session = await getServerSession(authOptions);
  const response = await fetch(url + "/equipos-de-trabajo", {
    headers: {
      Authorization: "Bearer " + session?.user.token,
    },
  });
  if (response.status !== HttpStatus.OK) {
    const error = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}

export async function getEquiposDasboard(): Promise<EquiposDashboard> {
  const session = await getServerSession(authOptions);

  const response = await fetch(url + "/equipos", {
    headers: {
      Authorization: "Bearer " + session?.user.token,
    },
  });
  if (response.status !== HttpStatus.OK) {
    const error = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}
