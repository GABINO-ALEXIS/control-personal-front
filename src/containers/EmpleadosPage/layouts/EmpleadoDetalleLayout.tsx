import { useNavigate, useParams } from 'react-router-dom';
import { empleados } from '../EmpleadosPage';
import { CalendarDate, parseDate } from '@internationalized/date';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import {
  Tabs,
  Tab,
  Switch,
  CardBody,
  Card,
  Input,
  DatePicker,
  DateInput,
  Divider,
  Checkbox,
  Radio,
  RadioGroup,
} from '@nextui-org/react';
import { InputSearch } from '../../../modules/ui/components/InputSearch/InputSearch';
import InputCustom from '../../../modules/ui/components/InputCustom/InputCustom';
import { useState } from 'react';

export const EmpleadoDetalleLayout = () => {
  const { empleadoId } = useParams<{ empleadoId: string }>(); //!pendiente corregir del tipo undefined
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const empleado = empleados.find((e) => e.id === parseInt(empleadoId!));
  const isVertical = true;
  return (
    <div className="flex h-full w-full flex-col gap-6 bg-primario px-9 py-7 max-md:gap-2 max-md:p-2">
      <div className="flex w-full items-center justify-between max-md:flex-col">
        <div className="flex gap-5 max-md:w-full max-md:justify-between max-md:p-2">
          <FaLongArrowAltLeft
            onClick={goBack}
            className="size-9 cursor-pointer text-gris"
          />
          <div className="flex items-center justify-center gap-2">
            <div
              className={`flex size-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500`}
            >
              <img src="" alt="" />
            </div>
            <span className="text-blanco">Empleado Nombre</span>
          </div>
        </div>
        <InputSearch />
      </div>
      <div className="flex w-full flex-col overflow-auto rounded-xl bg-blanco p-5 max-md:p-3">
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList:
              'gap-6 w-full relative rounded-none p-0 border-b border-divider',
            cursor: 'w-full bg-primario',
            tab: 'max-w-fit px-0 h-12',
            tabContent:
              'group-data-[selected=true]:text-primario group-data-[selected=true]:font-semibold',
          }}
        >
          <Tab key="perfil" title="Perfil">
            <div className="flex w-full flex-col rounded-xl bg-green-400 max-md:p-3">
              <Tabs
                aria-label="Options"
                color="primary"
                isVertical={true}
                classNames={{
                  tabList:
                    'w-full relative rounded-none p-0 border-b bg-blanco ',
                  cursor: 'w-full bg-primario',
                  tab: 'max-w-fit h-10 px-3',
                  tabContent:
                    'group-data-[selected=true]:text-blanco group-data-[selected=true]:font-semibold',
                }}
              >
                <Tab
                  key="datosPersonales"
                  title="Datos Personales"
                  className="w-full bg-red-200"
                >
                  <div className="flex h-full w-full flex-col items-center justify-center bg-purple-500">
                    <div>
                      <div className="size-32 rounded-full bg-red-400">
                        foto
                      </div>
                      <span>nombres</span>
                    </div>
                    <div className="flex max-w-[722px] flex-wrap justify-between gap-3 bg-pink-500">
                      <InputCustom
                        type="text"
                        label="Cargo"
                        defaultValue="Pintor"
                      />
                      <div className="flex w-full max-w-xs items-center">
                        <Checkbox
                          isSelected={isSelected}
                          onValueChange={setIsSelected}
                        >
                          Asegurado
                        </Checkbox>
                      </div>
                      <InputCustom
                        type="text"
                        label="Nombres"
                        defaultValue="Pedro"
                      />
                      <InputCustom
                        type="text"
                        label="Apellidos"
                        defaultValue="Garcia Perez"
                      />
                      <InputCustom
                        type="text"
                        label="DNI"
                        defaultValue="12345678"
                      />
                      <DatePicker
                        label="Fecha de Nacimiento"
                        className="max-w-xs"
                        labelPlacement="outside"
                      />

                      <InputCustom
                        type="text"
                        label="DNI"
                        defaultValue="12345678"
                      />

                      <InputCustom
                        type="number"
                        label="Edad"
                        defaultValue="23"
                      />
                      <RadioGroup
                        label="Select your favorite city"
                        orientation="horizontal"
                        className="w-full max-w-xs"
                        defaultValue="masculino"
                      >
                        <Radio value="masculino">Masculino</Radio>
                        <Radio value="femenino">Femenino</Radio>
                      </RadioGroup>
                    </div>
                    <Divider className="my-4" />
                    <h2 className="mr-auto">Dirección</h2>
                    <div className="flex max-w-[722px] flex-wrap justify-between gap-3 bg-pink-500">
                      <InputCustom
                        type="text"
                        label="Domicilio"
                        defaultValue="Garcia Perez"
                      />
                      <InputCustom
                        type="text"
                        label="Distrito"
                        defaultValue="12345678"
                      />

                      <InputCustom
                        type="text"
                        label="Provincia"
                        defaultValue="12345678"
                      />

                      <InputCustom
                        type="text"
                        label="Departamento"
                        defaultValue="23asfaf"
                      />
                    </div>
                    <Divider className="my-4" />
                    <h2 className="mr-auto">Contacto</h2>
                    <div className="flex w-full max-w-[722px] justify-between gap-3 bg-pink-500">
                      <InputCustom
                        type="text"
                        label="Correo"
                        defaultValue="Garcia Perez"
                      />
                      <InputCustom
                        type="text"
                        label="Celular"
                        defaultValue="12345678"
                      />
                    </div>
                  </div>
                </Tab>

                <Tab
                  key="Examen Médico"
                  title="Examen Médico"
                  className="w-full bg-red-200"
                >
                  <div className="flex max-w-[722px] flex-wrap justify-between gap-3 bg-pink-500">
                    <DatePicker
                      label="Fecha"
                      className="max-w-xs"
                      labelPlacement="outside"
                    />
                    <Input
                      type="number"
                      label="Price"
                      placeholder="0.00"
                      labelPlacement="outside"
                      className="max-w-xs"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            S/.
                          </span>
                        </div>
                      }
                    />

                    <div className="flex w-full max-w-xs items-center">
                      <Checkbox
                        isSelected={isSelected}
                        onValueChange={setIsSelected}
                      >
                        Asegurado
                      </Checkbox>
                    </div>
                  </div>
                </Tab>
                <Tab key="configuración" title="Configuración">
                  Videos ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Tab>
              </Tabs>
            </div>
          </Tab>
          <Tab key="documentos" title="Documentos">
            Videos ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
