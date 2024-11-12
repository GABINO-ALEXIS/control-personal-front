type EmpleadoDataProps = {
  label: string;
  value: string | number | object;
};

export const EmpleadoData = ({ label, value }: EmpleadoDataProps) => {
  console.log({ label, value });

  const isObject = typeof value === 'object' && value !== null;
  return (
    <li
      className={`my-2 justify-between ${isObject ? 'block' : 'flex'} relative before:hover:absolute before:hover:-inset-2 before:hover:top-0 before:hover:block before:hover:h-full before:hover:bg-grisClaro`}
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
    </li>
  );
};
