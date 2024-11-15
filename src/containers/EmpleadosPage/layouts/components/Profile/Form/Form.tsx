import { useRef } from 'react';
import { EmpleadoData } from '../../EmpleadoData/EmpleadoData';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormFields } from '../../../../types/FormFields';
import { EmpleadoProps } from '../../../../types/EmpleadoProps';

type FormType = {
  empleadoProps: EmpleadoProps[];
};

export const Form = ({ empleadoProps }: FormType) => {
  const fR = useRef<HTMLFormElement>(null);
  const hC = () => fR.current?.requestSubmit();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>();

  console.log({ errors });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const [key, value] = Object.entries(data).at(-1) as [
      string,
      string | Record<string, string>,
    ];
    const newData = { [key]: value };

    reset({});
    console.log(newData);
  };
  return (
    <form ref={fR} onSubmit={handleSubmit(onSubmit)}>
      {empleadoProps.map((item, index) => (
        <EmpleadoData
          hC={hC}
          key={index}
          label={item.label}
          value={item.value}
          register={register}
          errors={errors}
        />
      ))}
    </form>
  );
};
