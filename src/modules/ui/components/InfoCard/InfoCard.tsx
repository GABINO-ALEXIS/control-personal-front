import { INFO_ICONS } from '../../../cargo/const/infoIcons';
import { Cargotype } from '../../../cargo/enums/cargo-type';

type TimeOption =
  | { years: number; months?: never; days?: never }
  | { months: number; years?: never; days?: never }
  | { days: number; years?: never; months?: never };

type InfoCardProps = {
  text: Cargotype | 'Asegurado' | 'Alta';
  subText: TimeOption | boolean;
  className?: string;
};

export const InfoCard = ({
  text,
  subText,
  className = 'bg-blue-100  text-blue-500',
}: InfoCardProps) => {
  const iconText =
    text === 'Asegurado' && !subText
      ? 'No Asegurado'
      : text === 'Alta' && !subText
        ? 'No Alta'
        : text;
  const Icon = INFO_ICONS[iconText];
  let newSubText: number = 0;
  let timeText: string = '';

  if (typeof subText === 'object') {
    if ('years' in subText) {
      newSubText = subText.years!;
      timeText = 'Años';
    }
    if ('months' in subText) {
      newSubText = subText.months!;
      timeText = 'Meses';
    }
    if ('days' in subText) {
      newSubText = subText.days!;
      timeText = 'Dias';
    }
  }

  return (
    <div className="flex w-56 items-center justify-start gap-3 rounded-lg bg-blanco p-2">
      <span
        className={`rounded-lg p-3 ${subText ? className : 'bg-red-100 p-3 text-red-500'}`}
      >
        <Icon className="size-7" />
      </span>
      <div>
        <p className="font-medium">{text}</p>
        <p>
          {typeof subText === 'boolean' ? (
            subText ? (
              'Si'
            ) : (
              'No'
            )
          ) : (
            <>
              {newSubText}
              <span className="pl-1 text-sm font-light text-gray-500">
                {timeText}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
