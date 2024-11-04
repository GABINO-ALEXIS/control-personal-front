import { Link } from 'react-router-dom';

export const empleados = [
  { id: 1, nombres: 'pedro', apellidos: 'torres', edad: 23, pais: 'Peru' },
  { id: 2, nombres: 'maria', apellidos: 'paz', edad: 13, pais: 'EE.UU' },
  { id: 3, nombres: 'alan', apellidos: 'garcia', edad: 53, pais: 'Mexico' },
  { id: 4, nombres: 'juan', apellidos: 'perez', edad: 23, pais: 'Chile' },
];
const EmpleadosPage = () => {
  return (
    <div className="flex-1 bg-green-500">
      {empleados.map((n, i) => (
        <>
          <Link key={i} to={`${n.id}`}>
            {`${n.nombres},${n.apellidos}`}
          </Link>
          <br />
        </>
      ))}
    </div>
  );
};

export default EmpleadosPage;
