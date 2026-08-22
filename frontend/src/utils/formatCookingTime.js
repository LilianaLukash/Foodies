import { STEPPER } from '@constants';

export const formatCookingTime = (minutes, emptyLabel = STEPPER.EMPTY_LABEL) => {
  if (minutes == null || minutes === '' || Number.isNaN(Number(minutes))) {
    return emptyLabel;
  }

  const total = Number(minutes);
  if (total <= STEPPER.HOUR_THRESHOLD) return `${total} min`;

  const hours = Math.floor(total / STEPPER.MINUTES_PER_HOUR);
  const mins = total % STEPPER.MINUTES_PER_HOUR;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr ${mins} min`;
};
