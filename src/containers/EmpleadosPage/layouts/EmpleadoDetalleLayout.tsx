import { useNavigate, useParams } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { CgWorkAlt } from 'react-icons/cg';
import { IoBandageOutline } from 'react-icons/io5';
import { MdOutlinePersonalInjury } from 'react-icons/md';
import {
  Tabs,
  Tab,
  AvatarIcon,
  Avatar,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from '@nextui-org/react';
import { InputSearch } from '../../../modules/ui/components/InputSearch/InputSearch';
import { StatCard } from '../../../modules/ui/components/StatCard/StatCard';
import { Profile } from './components/Profile/Profile';
import { Page } from '../../../global/ui/components/Page/Page';
import { Section } from '../../../modules/ui/components/Section/Section';
import { useGetEmpleadoByIdQuery } from '../../../modules/empleado/services/empleadoApiSlice';
import { Error } from '../../../modules/ui/components/Error/Error';
import { ExamenMedico } from './components/ExamenMedico/ExamenMedico';

const EmpleadoDetalleLayout = () => {
  const { empleadoId = '' } = useParams<{ empleadoId: string }>();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const {
    data: empleado,
    isLoading,
    isError,
    error,
  } = useGetEmpleadoByIdQuery({
    id: empleadoId,
  });
  const examenMedico = empleado?.examenMedico;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {isLoading ? (
        <Spinner label="Cargando..." className="h-full w-full bg-primario" />
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
                onClick={goBack}
                className="size-9 cursor-pointer text-gris"
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
                <span className="text-blanco">Empleado Nombre</span>
              </div>
            </div>
            <InputSearch />
          </div>
          <div className="scrollbar-custom flex w-full flex-col overflow-auto rounded-xl bg-primario pr-5 max-md:pr-1">
            <Tabs aria-label="Options">
              <Tab key="perfil" title=" Perfil">
                <section className="flex h-full w-full gap-5 bg-primario max-md:block">
                  <Profile {...empleado} />
                  <div className="flex h-fit basis-full flex-wrap max-md:pt-3">
                    <div className="flex flex-auto justify-center p-1">
                      <StatCard
                        icon={<CgWorkAlt className="size-7" />}
                        text="Cargoss"
                        time={{ years: 2 }}
                      />
                    </div>
                    <div className="flex flex-auto justify-center p-1">
                      <StatCard
                        icon={<IoBandageOutline className="size-7" />}
                        text="Asegurado"
                        time={{ months: 2 }}
                      />
                    </div>
                    <div className="flex flex-auto justify-center p-1">
                      <StatCard
                        icon={<MdOutlinePersonalInjury className="size-7" />}
                        text="Alta"
                        time={{ days: 2 }}
                      />
                    </div>
                    <Section className="mt-5 flex flex-col">
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
                        <Tab
                          key="examenMedico"
                          title="Examen Médico"
                          className="px-0 pb-0"
                        >
                          <ExamenMedico data={examenMedico} />
                        </Tab>
                        <Tab
                          key="configuracion"
                          title="Configuración"
                          className="px-0 pb-0"
                        >
                          <div className="flex items-center gap-7 rounded-xl border-2 border-dotted border-gris p-5 max-md:flex-col max-md:p-4">
                            <div className="flex-1">
                              <p className="font-semibold leading-9">
                                Eliminar Empleado
                              </p>
                              <p className="text-justify">
                                Eliminarás definitivamente todos los datos
                                relacionados con el empleado sin la posibilidad
                                de recuperar la información.
                              </p>
                            </div>
                            <Button
                              color="danger"
                              variant="bordered"
                              onPress={onOpen}
                              startContent={<AvatarIcon />}
                              className="flex-1 hover:bg-danger hover:text-blanco"
                            >
                              Eliminar Empleado
                            </Button>
                            <Modal
                              isOpen={isOpen}
                              placement={'center'}
                              onOpenChange={onOpenChange}
                            >
                              <ModalContent>
                                {(onClose) => (
                                  <>
                                    <ModalHeader className="flex flex-col gap-1">
                                      ¿Estas Seguro?
                                    </ModalHeader>
                                    <ModalBody>
                                      <p>
                                        ¿Estás seguro de que quieres eliminar el
                                        siguiente empleado?
                                      </p>
                                      <p>
                                        {`- ${empleado?.nombres} ${empleado?.apellidos}`}
                                      </p>
                                      <p>
                                        *Todos los datos relacionados con los
                                        empleados se eliminarán definitivamente
                                        de nuestros registros y no se podrán
                                        recuperar.
                                      </p>
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button
                                        color="default"
                                        variant="light"
                                        onPress={onClose}
                                      >
                                        Cerrar
                                      </Button>
                                      <Button color="danger" onPress={onClose}>
                                        Eliminar
                                      </Button>
                                    </ModalFooter>
                                  </>
                                )}
                              </ModalContent>
                            </Modal>
                          </div>
                        </Tab>
                      </Tabs>
                    </Section>
                  </div>
                </section>
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
// import { useNavigate, useParams } from 'react-router-dom';
// import { empleados } from '../EmpleadosPage';
// import { FaLongArrowAltLeft } from 'react-icons/fa';
// import { CgWorkAlt } from 'react-icons/cg';
// import { IoBandageOutline } from 'react-icons/io5';
// import { MdOutlinePersonalInjury } from 'react-icons/md';
// import {
//   Tabs,
//   Tab,
//   AvatarIcon,
//   Avatar,
//   Checkbox,
//   Button,
//   useDisclosure,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from '@nextui-org/react';
// import { InputSearch } from '../../../modules/ui/components/InputSearch/InputSearch';
// import { StatCard } from '../../../modules/ui/components/StatCard/StatCard';
// import { Profile } from './components/Profile/Profile';
// import { SolAmount } from '../../../modules/ui/components/SolAmount/SolAmount';

// const EmpleadoDetalleLayout = () => {
//   const { empleadoId } = useParams<{ empleadoId: string }>(); //!pendiente corregir del tipo undefined
//   const navigate = useNavigate();
//   const goBack = () => navigate(-1);
//   const empleado = empleados.find((e) => e.id === parseInt(empleadoId!));

//   const empleadoEjemplo = {
//     dni: 12345678,
//     edad: 23,
//     sexo: 'Masculino',
//     fechaNacimiento: '12/09/1990',
//     direccion: {
//       provincia: 'Av. Siempre Viva',
//       distrito: 'Springfield',
//       domicilio: 'USA',
//     },
//     nombres: 'Pedro Martines',
//     apellidos: 'Torres Cruz',
//     correo: 'pedro@gmail.com',
//     celular: 123456789,
//     alta: false,
//   };

//   const { alta, ...empleadoProfile } = empleadoEjemplo;
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   return (
//     <section className="flex h-full w-full flex-col gap-6 bg-primario px-9 py-7 max-md:gap-2 max-md:p-2">
//       <div className="flex w-full items-center justify-between max-md:flex-col">
//         <div className="flex gap-5 max-md:w-full max-md:justify-between max-md:p-2 max-md:pb-4 max-md:pl-1">
//           <FaLongArrowAltLeft
//             onClick={goBack}
//             className="size-9 cursor-pointer text-gris"
//           />
//           <div className="flex items-center justify-center gap-3">
//             <Avatar
//               isBordered
//               icon={<AvatarIcon />}
//               classNames={{
//                 base: 'bg-gradient-to-br from-[#FFB457] to-[#FF705B]',
//                 icon: 'text-black/80',
//               }}
//               className="size-10"
//             />
//             <span className="text-blanco">Empleado Nombre</span>
//           </div>
//         </div>
//         <InputSearch />
//       </div>
//       <div className="flex w-full flex-col overflow-auto rounded-xl bg-blanco p-5 max-md:p-3">
//         <Tabs aria-label="Options">
//           <Tab key="perfil" title="Perfil" className="flex">
//             {/* <Tab key="perfil" title="Perfil" className="flex p-0"> */}
//             <section className="flex h-full w-full gap-5 bg-primario p-5 max-md:block">
//               <Profile {...empleadoProfile} />
//               <div className="flex h-fit basis-full flex-wrap">
//                 <div className="flex flex-auto justify-center p-1">
//                   <StatCard
//                     icon={<CgWorkAlt className="size-7" />}
//                     text="Cargoss"
//                     time={{ years: 2 }}
//                   />
//                 </div>
//                 <div className="flex flex-auto justify-center p-1">
//                   <StatCard
//                     icon={<IoBandageOutline className="size-7" />}
//                     text="Asegurado"
//                     time={{ months: 2 }}
//                   />
//                 </div>
//                 <div className="flex flex-auto justify-center p-1">
//                   <StatCard
//                     icon={<MdOutlinePersonalInjury className="size-7" />}
//                     text="Alta"
//                     time={{ days: 2 }}
//                   />
//                 </div>
//                 <div className="mt-5 flex w-full flex-col overflow-auto rounded-xl bg-blanco px-4 py-2 max-md:mt-3 max-md:px-3 max-md:py-1">
//                   <Tabs
//                     aria-label="Options"
//                     color="primary"
//                     variant="underlined"
//                     classNames={{
//                       tabList:
//                         'gap-6 w-full relative rounded-none p-0 border-b border-divider',
//                       cursor: 'w-full bg-primario',
//                       tab: 'max-w-fit px-0 h-12',
//                       tabContent:
//                         'group-data-[selected=true]:text-primario group-data-[selected=true]:font-semibold',
//                     }}
//                   >
//                     <Tab
//                       key="examenMedico"
//                       title="Examen Médico"
//                       className="px-0 pb-0"
//                     >
//                       <ul className="">
//                         <li className="my-2 flex justify-between">
//                           <span>Fecha:</span>
//                           <span>21/21/2034</span>
//                         </li>
//                         <li className="my-2 flex justify-between">
//                           <span>Monto Gastado:</span>
//                           <SolAmount monto={1123.23} />
//                         </li>
//                         <li className="my-2 flex justify-between">
//                           <Checkbox isSelected={true}>Alta</Checkbox>
//                         </li>
//                       </ul>
//                     </Tab>
//                     <Tab key="configuracion" title="Configuración">
//                       <div className="flex items-center gap-7 rounded-xl border-2 border-dotted border-gris p-5 max-md:flex-col max-md:p-4">
//                         <div className="flex-1">
//                           <p className="font-semibold leading-9">
//                             Eliminar Empleado
//                           </p>
//                           <p className="text-justify">
//                             Eliminarás definitivamente todos los datos
//                             relacionados con el empleado sin la posibilidad de
//                             recuperar la información.
//                           </p>
//                         </div>
//                         <Button
//                           color="danger"
//                           variant="bordered"
//                           onPress={onOpen}
//                           startContent={<AvatarIcon />}
//                           className="flex-1 hover:bg-danger hover:text-blanco"
//                         >
//                           Eliminar Empleado
//                         </Button>
//                         <Modal
//                           isOpen={isOpen}
//                           placement={'center'}
//                           onOpenChange={onOpenChange}
//                         >
//                           <ModalContent>
//                             {(onClose) => (
//                               <>
//                                 <ModalHeader className="flex flex-col gap-1">
//                                   ¿Estas Seguro?
//                                 </ModalHeader>
//                                 <ModalBody>
//                                   <p>
//                                     ¿Estás seguro de que quieres eliminar el
//                                     siguiente empleado?
//                                   </p>
//                                   <p>
//                                     -{empleadoEjemplo.nombres}
//                                     {empleadoEjemplo.apellidos}
//                                   </p>
//                                   <p>
//                                     *Todos los datos relacionados con los
//                                     empleados se eliminarán definitivamente de
//                                     nuestros registros y no se podrán recuperar.
//                                   </p>
//                                 </ModalBody>
//                                 <ModalFooter>
//                                   <Button
//                                     color="default"
//                                     variant="light"
//                                     onPress={onClose}
//                                   >
//                                     Cerrar
//                                   </Button>
//                                   <Button color="danger" onPress={onClose}>
//                                     Eliminar
//                                   </Button>
//                                 </ModalFooter>
//                               </>
//                             )}
//                           </ModalContent>
//                         </Modal>
//                       </div>
//                     </Tab>
//                   </Tabs>
//                 </div>
//               </div>
//             </section>
//           </Tab>
//           <Tab key="documentos" title="Documentos">
//             Videos ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat.
//           </Tab>
//         </Tabs>
//       </div>
//     </section>
//   );
// };

// export default EmpleadoDetalleLayout;
