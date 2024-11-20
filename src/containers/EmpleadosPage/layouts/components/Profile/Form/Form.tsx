import { useRef } from 'react';
import { EmpleadoData } from '../../EmpleadoData/EmpleadoData';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormFields } from '../../../../types/FormFields';
import { EmpleadoProps } from '../../../../types/EmpleadoProps';
import { useUpdateEmpleadoMutation } from '../../../../../../modules/empleado/services/empleadoApiSlice';
import { processLastEntry } from '../../../../../../global/utils/processLastEntry';

type FormType = {
  empleadoId: string;
  empleadoProps: EmpleadoProps[];
};

export const Form = ({ empleadoProps, empleadoId }: FormType) => {
  const fR = useRef<HTMLFormElement>(null);
  const hC = () => fR.current?.requestSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<FormFields>();

  const [
    updateEmpleado,
    { isLoading: isUpdating, isSuccess, isError, reset: resetMutation },
  ] = useUpdateEmpleadoMutation();

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    const newData = processLastEntry(data);
    try {
      await updateEmpleado({ id: empleadoId, ...newData }).unwrap();
      reset({});
    } catch (err: any) {
      const fieldIdentifier: any = Object.keys(newData)[0];
      if (err.status === 409) {
        setError(fieldIdentifier, {
          message:
            'El valor del campo ya esta registrado, ingrese uno diferente',
        });
      }
    }
  };

  return (
    <form ref={fR} onSubmit={handleSubmit(onSubmit)}>
      {empleadoProps.map((item, index) => (
        <EmpleadoData
          isUpdating={isUpdating}
          hC={hC}
          key={index}
          label={item.label}
          value={item.value}
          register={register}
          setValue={setValue}
          errors={errors}
          isSuccess={isSuccess}
          resetMutation={resetMutation}
          isError={isError}
          reset={reset}
        />
      ))}
    </form>
  );
};
