export type AccountBankProps = {
  id: number;
  transactionDate: Date;
  description: string;
  category: string;
  debit: number;
  credit: number;
  isNumeric?: boolean;
  detail?: unknown;
};
