import { ReactElement } from 'react';

type TimeOption =
  | { years: number; months?: never; days?: never }
  | { months: number; years?: never; days?: never }
  | { days: number; years?: never; months?: never };

type StatCardProps = {
  icon: ReactElement;
  text: string;
  time?: TimeOption;
  isRed?: boolean;
};

export const StatCard = ({ icon, text, time, isRed }: StatCardProps) => {
  let timeValue: number | undefined = 0;
  let timeText: string = '';

  if (time) {
    if ('years' in time) {
      timeValue = time.years;
      timeText = 'Años';
    }
    if ('months' in time) {
      timeValue = time.months;
      timeText = 'Meses';
    }
    if ('days' in time) {
      timeValue = time.days;
      timeText = 'Dias';
    }
  }

  return (
    <div className="flex w-full max-w-56 items-center justify-start gap-3 rounded-lg bg-blanco p-2">
      <span
        className={`rounded-lg p-3 ${isRed ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'} `}
      >
        {icon}
      </span>
      <div>
        <p>{text}</p>
        <p className={`font-semibold`}>
          {timeValue}
          <span className="pl-1 text-sm font-light text-gris">{timeText}</span>
        </p>
      </div>
    </div>
  );
};
