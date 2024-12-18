import { Avatar, AvatarIcon } from '@nextui-org/react';
import { SimpleCard } from '../../../../../modules/ui/components/SimpleCard/SimpleCard';
import { BiMessageRounded } from 'react-icons/bi';
import { MdOutlineEmail } from 'react-icons/md';
import { Section } from '../../../../../modules/ui/components/Section/Section';
import { Empleado } from '../../../../../modules/empleado/types/Empleado';
import { format } from '@formkit/tempo';
import { Form } from './Form/Form';
import { EmpleadoProps } from '../../../types/EmpleadoProps';

export const Profile = ({
  id,
  dni,
  edad,
  sexo,
  fechaNacimiento,
  direccion,
  nombres,
  apellidos,
  correo,
  celular,
}: Empleado) => {
  const empleadoProps: EmpleadoProps[] = [
    { label: 'DNI', value: dni },
    { label: 'Nombres', value: nombres },
    { label: 'Apellidos', value: apellidos },
    { label: 'Edad', value: edad },
    {
      label: 'Sexo',
      value: sexo,
    },
    {
      label: 'Fecha de Nacimiento',
      value: format(fechaNacimiento, 'DD/MM/YYYY'),
    },
    {
      label: 'Dirección',
      value: {
        Departamento: direccion.departamento,
        Provincia: direccion.provincia,
        Distrito: direccion.distrito,
        Domicilio: direccion.domicilio,
      },
    },
    { label: 'Correo', value: correo },
    { label: 'Celular', value: celular },
  ];

  return (
    <Section className="basis-1/2 rounded-xl">
      <div className="relative mt-16 flex flex-col items-center justify-center gap-2 rounded-xl bg-grisClaro pb-3 pt-16 max-md:mt-0 max-md:pt-4">
        <Avatar
          isBordered
          color="primary"
          icon={<AvatarIcon />}
          classNames={{
            base: 'bg-gradient-to-br from-[#FFB457] to-[#FF705B]',
            icon: 'text-black/80',
          }}
          className="max-md:h-24 max-md:w-24 md:absolute md:-top-14 md:h-28 md:w-28"
          src={undefined}
        />
        <span className="font-semibold">{`${nombres} ${apellidos}`}</span>
        <div className="flex gap-3">
          <SimpleCard
            icon={<BiMessageRounded className="text-blue-500" />}
            text="Mensaje"
          />
          <SimpleCard
            icon={<MdOutlineEmail className="text-blue-500" />}
            text="Correo"
          />
        </div>
      </div>
      <div className="mt-2">
        <span className="font-semibold">Información Personal</span>
        <Form empleadoProps={empleadoProps} empleadoId={id} />
      </div>
    </Section>
  );
};
