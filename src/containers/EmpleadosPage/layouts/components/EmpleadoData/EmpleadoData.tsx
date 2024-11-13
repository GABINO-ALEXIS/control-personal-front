import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { UseFormRegister } from 'react-hook-form';
import { FormFields } from '../../../types/FormFields';
import { IDENTIFIERS_FIELDS } from '../../../const/identifiersFields';
import { removeAccents } from '../../../../../global/utils/removeAccents';

type EmpleadoDataProps = {
  hC: () => void;
  label: string;
  value: string | number | object;
  register: UseFormRegister<FormFields>;
};

export const EmpleadoData = ({
  hC,
  label,
  value,
  register,
}: EmpleadoDataProps) => {
  const isObject = typeof value === 'object' && value !== null;

  return (
    <Popover backdrop="opaque">
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
                  <Input
                    {...register(
                      `${removeAccents(label.toLowerCase())}.${IDENTIFIERS_FIELDS[removeAccents(label)][subLabel]}` as any,
                    )}
                    key={i}
                    defaultValue={subValue}
                    label={subLabel}
                    size="sm"
                    variant="bordered"
                  />
                ))
              ) : (
                <Input
                  {...register(IDENTIFIERS_FIELDS[label])}
                  defaultValue={value.toString()}
                  label="Nuevo Valor"
                  size="sm"
                  variant="bordered"
                />
              )}
              <Button className="bg-primario text-blanco" onPress={hC}>
                Guardar
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
