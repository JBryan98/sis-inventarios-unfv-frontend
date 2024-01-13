
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { EquipoConComponentes } from '@/interface/EquipoConComponentes';
import EquipoDetails from '@/components/equipos/details/EquipoDetails';
import { Metadata } from 'next';

const getEquipo = async (nombre: string): Promise<EquipoConComponentes> => {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/equipos/${nombre}`,
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
  const equipo = await getEquipo(params.nombre);
  return {
    title: `Detalles del Equipo ${equipo.nombre}`,
  };
}

const EquipoDetallesPage = async ({ params }: Props) => {
  const data = await getEquipo(params.nombre);
  return <EquipoDetails data={data} />;
};

export default EquipoDetallesPage;