import { useEffect, useState } from 'react';
import RouterApp from './global/routes/RouterApp';
import Loading from './global/ui/components/Loading/Loading';

function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulación de inicialización, como el registro de servicios o carga de configuraciones
  //   const initializeApp = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //     setLoading(false);
  //   };

  //   initializeApp();
  // }, []);

  // if (loading)
  //   return (
  //     <div className="flex h-lvh w-lvw items-center justify-center bg-blanco">
  //       <Loading />
  //     </div>
  //   );
  return <RouterApp />;
}

export default App;
