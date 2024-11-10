type EmpleadoDataProps = {
  label: string;
  value: string | number | object;
};

export const EmpleadoData = ({ label, value }: EmpleadoDataProps) => {
  const isObject = typeof value === 'object' && value !== null;
  return (
    <li
      className={`my-2 justify-between ${isObject ? 'block' : 'flex'} transition-all hover:rounded-lg hover:bg-slate-300 hover:px-2`}
    >
      <span>{label}:</span>
      {isObject ? (
        <div className="space-y-1 px-4">
          {Object.entries(value).map(([subLabel, subValue], index) => (
            <div key={index} className="flex justify-between">
              <span>{subLabel}:</span>
              <span>{subValue}</span>
            </div>
          ))}
        </div>
      ) : (
        <span>{value}</span>
      )}
    </li>
  );
};
