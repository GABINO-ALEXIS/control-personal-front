import { useNavigate, useParams } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Tabs, Tab, AvatarIcon, Avatar, Spinner } from '@nextui-org/react';
import { InputSearch } from '../../../modules/ui/components/InputSearch/InputSearch';
import { Page } from '../../../global/ui/components/Page/Page';
import { useGetEmpleadoByIdQuery } from '../../../modules/empleado/services/empleadoApiSlice';
import { Error } from '../../../modules/ui/components/Error/Error';
import { SeccionPerfil } from './components/SeccionPerfil/SeccionPerfil';

const EmpleadoDetalleLayout = () => {
  const navigate = useNavigate();
  const { empleadoId = '' } = useParams<{ empleadoId: string }>();
  const {
    data: empleado,
    isLoading,
    isError,
    error,
  } = useGetEmpleadoByIdQuery({
    id: empleadoId,
  });

  const nombres = empleado?.nombres;
  const apellidos = empleado?.apellidos;

  return (
    <>
      {isLoading ? (
        <Spinner
          className="h-full w-full bg-primario"
          size="lg"
          color="default"
        />
      ) : isError ? (
        <Error
          error={error}
          redireccion="/empleados"
          bottomMessage="Regresar"
        />
      ) : (
        <Page className="flex-col gap-6 max-md:gap-3">
          <div className="flex w-full items-center justify-between max-md:flex-col">
            <div className="flex gap-5 max-md:w-full max-md:justify-between max-md:p-2 max-md:pb-4 max-md:pl-1">
              <FaLongArrowAltLeft
                onClick={() => navigate(-1)}
                className="size-9 cursor-pointer text-grisOscuro"
              />
              <div className="flex items-center justify-center gap-3">
                <Avatar
                  isBordered
                  icon={<AvatarIcon />}
                  classNames={{
                    base: 'bg-gradient-to-br from-[#FFB457] to-[#FF705B]',
                    icon: 'text-black/80',
                  }}
                  className="size-10"
                />
                <span className="text-blanco">{`${nombres} ${apellidos}`}</span>
              </div>
            </div>
            <InputSearch />
          </div>
          <div className="scrollbar-custom flex w-full flex-col overflow-auto rounded-xl bg-primario pr-5 max-md:pr-1">
            <Tabs aria-label="Options" className="ml-1">
              <Tab key="perfil" title=" Perfil">
                <SeccionPerfil empleado={empleado!} />
              </Tab>
              <Tab key="documentos" title="Documentos">
                Videos ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Tab>
            </Tabs>
          </div>
        </Page>
      )}
    </>
  );
};

export default EmpleadoDetalleLayout;
