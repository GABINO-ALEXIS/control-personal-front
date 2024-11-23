import { ButtonProps } from '@nextui-org/react';

export const STATUSCOLORMAP: Record<string, ButtonProps['color']> = {
  presente: 'success',
  tarde: 'warning',
  justificado: 'secondary',
  ausente: 'danger',
};
