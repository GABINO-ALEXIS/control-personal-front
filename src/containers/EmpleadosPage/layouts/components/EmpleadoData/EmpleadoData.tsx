import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import {
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { FormFields } from '../../../types/FormFields';
import { removeAccents } from '../../../../../global/utils/removeAccents';
import { RenderField } from './RenderField/RenderField';
import { FIELDS_INPUTS_TYPES } from '../../../const/fields-inputs-types';
import { useState } from 'react';

type EmpleadoDataProps = {
  isSuccess: boolean;
  isError: boolean;
  resetMutation: () => void;
  isUpdating: boolean;
  errors: FieldErrors<FormFields>;
  hC: () => void;
  label: string;
  value: string | number | object;
  register: UseFormRegister<FormFields>;
  setValue: UseFormSetValue<FormFields>;
  reset: UseFormReset<FormFields>;
};

export const EmpleadoData = ({
  isSuccess,
  isError,
  resetMutation,
  isUpdating,
  hC,
  errors,
  label,
  value,
  register,
  setValue,
  reset,
}: EmpleadoDataProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isObject = typeof value === 'object' && value !== null;

  return (
    <Popover
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetMutation();
        reset({});
      }}
    >
      <PopoverTrigger>
        <div
          className={`my-2 justify-between ${isObject ? 'block' : 'flex'} relative cursor-pointer before:hover:absolute before:hover:-inset-2 before:hover:top-0 before:hover:block before:hover:h-full before:hover:bg-grisClaro`}
        >
          <span className="relative z-10">{label}:</span>
          {isObject ? (
            <div className="space-y-1 px-2 py-2">
              {Object.entries(value).map(([subLabel, subValue], index) => (
                <div key={index} className="flex justify-between">
                  <span className="z-10">{subLabel}:</span>
                  <span className="z-10">{subValue}</span>
                </div>
              ))}
            </div>
          ) : (
            <span className="z-10">{value}</span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="w-full px-1 py-2">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              {`Editar ${label}`}
            </p>
            <div className="mt-2 flex w-full flex-col gap-2">
              {isObject ? (
                Object.entries(value).map(([subLabel, subValue], i) => (
                  <span key={i}>
                    {RenderField({
                      input: {
                        type: (
                          FIELDS_INPUTS_TYPES[removeAccents(label)] as any
                        )[subLabel].type,
                        options: (
                          FIELDS_INPUTS_TYPES[removeAccents(label)] as any
                        )[subLabel].options,
                      },
                      register,
                      setValue,
                      errors,
                      label,
                      subLabel,
                      subValue,
                    })}
                  </span>
                ))
              ) : (
                <>
                  {RenderField({
                    input: {
                      type: FIELDS_INPUTS_TYPES[label].type as any,
                      options: FIELDS_INPUTS_TYPES[label].options as any,
                    },
                    register,
                    setValue,
                    errors,
                    label,
                    value,
                  })}
                </>
              )}
              <Button
                className={`bg-primario text-blanco ${isSuccess && 'opacity-100'}`}
                isLoading={isUpdating}
                isDisabled={isSuccess}
                onPress={hC}
              >
                {isError
                  ? 'Ocurrio un error'
                  : isSuccess
                    ? 'Actualizado'
                    : 'Guardar'}
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
