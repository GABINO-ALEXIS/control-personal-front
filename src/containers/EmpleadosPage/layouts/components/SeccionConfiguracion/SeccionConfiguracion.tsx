import {
  AvatarIcon,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import {
  empleadoApiSlice,
  useDeleteEmpleadoMutation,
} from '../../../../../modules/empleado/services/empleadoApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../../../../global/store/hooks';

type SeccionConfiguracionProps = {
  empleadoId: string;
  nombres: string;
  apellidos: string;
};

export const SeccionConfiguracion = ({
  empleadoId,
  nombres,
  apellidos,
}: SeccionConfiguracionProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteEmpleado, { isLoading: isDeleting, isSuccess, isError }] =
    useDeleteEmpleadoMutation();

  const onDeleteEmpleado = async (): Promise<void> => {
    try {
      await deleteEmpleado(empleadoId).unwrap();
      dispatch(
        empleadoApiSlice.util.updateQueryData('getEmpleados', {}, (draft) => {
          return draft.filter((empleado) => empleado.id !== empleadoId);
        }),
      );
      navigate('/empleados');
    } catch (e) {}
  };

  return (
    <div className="flex items-center gap-7 rounded-xl border-2 border-dotted border-grisOscuro p-5 max-md:flex-col max-md:p-4">
      <div className="flex-1">
        <p className="font-semibold leading-9">Eliminar Empleado</p>
        <p className="text-justify">
          Eliminarás definitivamente todos los datos relacionados con el
          empleado sin la posibilidad de recuperar la información.
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
      <Modal isOpen={isOpen} placement={'center'} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¿Estas Seguro?
              </ModalHeader>
              <ModalBody>
                <p>
                  ¿Estás seguro de que quieres eliminar el siguiente empleado?
                </p>
                <p>{`- ${nombres} ${apellidos}`}</p>
                <p>
                  *Todos los datos relacionados con los empleados se eliminarán
                  definitivamente de nuestros registros y no se podrán
                  recuperar.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="danger"
                  isLoading={isDeleting}
                  onPress={() => {
                    onDeleteEmpleado();
                    if (isSuccess) onClose();
                  }}
                >
                  {isError ? 'Ocurrio un error' : 'Eliminar'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
