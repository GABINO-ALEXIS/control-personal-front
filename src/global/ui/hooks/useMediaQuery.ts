import { useState, useEffect } from 'react';

export const useMediaQuery = () => {
  const [esMedianaPantalla, setEsMedianaPantalla] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const actualizarEstado = (e: any): void => setEsMedianaPantalla(e.matches);
    actualizarEstado(mediaQuery);
    mediaQuery.addEventListener('change', actualizarEstado);
    return () => mediaQuery.removeEventListener('change', actualizarEstado);
  }, []);

  return esMedianaPantalla;
};
