/* eslint-disable arrow-body-style */
import { format } from 'date-fns';

export const currencyFormatter = (value: number, nation: string = 'en-EN', currency: string = 'USD'): string => {
  return new Intl.NumberFormat(nation, {
    style: 'currency',
    currency,
  }).format(value);
};

export const dateFormatter = (date: Date, dateFormat: string = 'dd-MM-yyyy'): string => {
  return format(new Date(date), dateFormat);
};
