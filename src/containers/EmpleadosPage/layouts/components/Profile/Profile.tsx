import { Avatar, AvatarIcon } from '@nextui-org/react';
import { SimpleCard } from '../../../../../modules/ui/components/SimpleCard/SimpleCard';
import { BiMessageRounded } from 'react-icons/bi';
import { MdOutlineEmail } from 'react-icons/md';
import { EmpleadoData } from '../EmpleadoData/EmpleadoData';
import { Section } from '../../../../../modules/ui/components/Section/Section';
import { Empleado } from '../../../../../modules/empleado/types/Empleado';
import { format } from '@formkit/tempo';
import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormFields } from '../../../types/FormFields';

export const Profile = ({
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
  const fR = useRef<HTMLFormElement>(null);
  const hC = () => fR.current?.requestSubmit();

  const empleadoProps = [
    { label: 'DNI', value: dni },
    { label: 'Nombres', value: nombres },
    { label: 'Apellidos', value: apellidos },
    { label: 'Edad', value: edad },
    { label: 'Sexo', value: sexo },
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

  const { register, handleSubmit, reset } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const [key, value] = Object.entries(data).at(-1) as [
      string,
      string | Record<string, string>,
    ];
    const newData = { [key]: value };

    reset({});
    console.log(newData);

    const numeros = [
      dni,
      edad,
      sexo,
      fechaNacimiento,
      direccion,
      nombres,
      apellidos,
      correo,
      celular,
    ];
    const resultado = numeros.every((numero) => numero.toString() !== value);
    console.log(!resultado);
  };

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
        <form ref={fR} onSubmit={handleSubmit(onSubmit)}>
          {empleadoProps.map((item, index) => (
            <EmpleadoData
              hC={hC}
              key={index}
              label={item.label}
              value={item.value}
              register={register}
            />
          ))}
        </form>
      </div>
    </Section>
  );
};
