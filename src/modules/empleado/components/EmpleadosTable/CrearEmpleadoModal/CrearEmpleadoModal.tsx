import {
  Button,
  Checkbox,
  DateInput,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { DivInput } from '../../../../ui/components/DivInput/DivInput';
import { InputCustom } from '../../../../ui/components/InputCustom/InputCustom';
import { SEXO_OPTIONS } from '../../../../../containers/EmpleadosPage/const/sexo-options';
import { CARGO_OPTION } from '../../../../../containers/EmpleadosPage/const/cargo-option';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormFieldsCreateEmpleado } from '../../../types/FormFieldsCreateEmpleado';
import { VALIDATE_FIELDS } from '../../../../../containers/EmpleadosPage/const/validateFields';
import { useRef } from 'react';

type CrearEmpleadoModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export const CrearEmpleadoModal = ({
  isOpen,
  onOpenChange,
}: CrearEmpleadoModalProps) => {
  const fR = useRef<HTMLFormElement>(null);
  const hC = () => fR.current?.requestSubmit();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormFieldsCreateEmpleado>({
    defaultValues: {
      asegurado: false,
    },
  });

  const onSubmit: SubmitHandler<FormFieldsCreateEmpleado> = (
    data: FormFieldsCreateEmpleado,
  ) => {
    console.log(data);
  };

  return (
    <form ref={fR} onSubmit={handleSubmit(onSubmit)}>
      <Modal
        isOpen={isOpen}
        size="2xl"
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Empleado
              </ModalHeader>
              <ModalBody>
                <h2>Información Personal</h2>
                <DivInput>
                  <InputCustom
                    label="Nombres"
                    register={register}
                    errors={errors}
                  />
                  <InputCustom
                    label="Apellidos"
                    register={register}
                    errors={errors}
                  />
                </DivInput>
                <DivInput>
                  <InputCustom
                    label="DNI"
                    register={register}
                    errors={errors}
                  />
                  <Controller
                    name="fechaNacimiento"
                    control={control}
                    rules={VALIDATE_FIELDS['Fecha de Nacimiento']()}
                    render={({ field }) => (
                      <DateInput
                        isInvalid={Boolean(errors['fechaNacimiento'])}
                        errorMessage={
                          errors['fechaNacimiento']
                            ? errors['fechaNacimiento'].message
                            : undefined
                        }
                        label="Fecha de Nacimiento"
                        isRequired
                        variant="bordered"
                        size="sm"
                        onChange={(value) => {
                          const { year, month, day } = value;
                          field.onChange(
                            new Date(year, month > 0 ? month - 1 : month, day),
                          );
                        }}
                      />
                    )}
                  />
                </DivInput>
                <DivInput>
                  <InputCustom
                    label="Edad"
                    register={register}
                    type="number"
                    errors={errors}
                  />
                  <Controller
                    name="sexo"
                    control={control}
                    rules={{ required: 'El Sexo es obligatorio' }}
                    render={({ field }) => (
                      <Select
                        label="Sexo"
                        isInvalid={Boolean(errors['sexo'])}
                        errorMessage={
                          errors['sexo'] ? errors['sexo'].message : undefined
                        }
                        onSelectionChange={(keys) => {
                          const labelSelected = SEXO_OPTIONS.filter(
                            (e) => e.key === Array.from(keys)[0],
                          )[0]?.label;
                          field.onChange(labelSelected);
                        }}
                        variant="bordered"
                        size="sm"
                        isRequired
                      >
                        {SEXO_OPTIONS.map((s) => (
                          <SelectItem key={s.key}>{s.label}</SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                </DivInput>
                <h2>Dirección</h2>
                <DivInput>
                  <InputCustom
                    register={register}
                    labelObject="Dirección"
                    label="Departamento"
                    errors={errors}
                  />
                  <InputCustom
                    register={register}
                    labelObject="Dirección"
                    label="Provincia"
                    errors={errors}
                  />
                  <InputCustom
                    register={register}
                    labelObject="Dirección"
                    label="Distrito"
                    errors={errors}
                  />
                </DivInput>
                <DivInput>
                  <InputCustom
                    register={register}
                    labelObject="Dirección"
                    label="Domicilio"
                    errors={errors}
                  />
                </DivInput>
                <h2>Datos Laborales</h2>
                <DivInput>
                  <Controller
                    name="cargo"
                    control={control}
                    rules={{ required: 'El Cargo es obligatorio' }}
                    render={({ field }) => (
                      <Select
                        isInvalid={Boolean(errors['cargo'])}
                        errorMessage={
                          errors['cargo'] ? errors['cargo'].message : undefined
                        }
                        onSelectionChange={(keys) => {
                          const labelSelected = CARGO_OPTION.filter(
                            (e) => e.key === Array.from(keys)[0],
                          )[0]?.label;
                          field.onChange(labelSelected);
                        }}
                        label="Cargo"
                        variant="bordered"
                        size="sm"
                        isRequired
                      >
                        {CARGO_OPTION.map((c) => (
                          <SelectItem key={c.key}>{c.label}</SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                  <div className="flex w-full">
                    <Checkbox
                      onValueChange={(value) => setValue('asegurado', value)}
                      classNames={{
                        label: 'text-small',
                      }}
                    >
                      Asegurado
                    </Checkbox>
                  </div>
                </DivInput>
                <h2>Contacto</h2>
                <DivInput>
                  <InputCustom
                    register={register}
                    label="Correo"
                    type="email"
                    errors={errors}
                  />
                  <InputCustom
                    register={register}
                    label="Celular"
                    errors={errors}
                  />
                </DivInput>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={hC}>
                  Crear Empleado
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </form>
  );
};
