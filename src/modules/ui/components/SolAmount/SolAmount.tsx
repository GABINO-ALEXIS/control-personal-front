type SolAmountProps = {
  monto: number;
};

export const SolAmount = ({ monto }: SolAmountProps) => {
  const formatoMoneda = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  });
  return <span>{formatoMoneda.format(monto)}</span>;
};
