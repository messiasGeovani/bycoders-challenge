export interface ICreateTransactionsRequestDTO {
  type: string;
  date: string;
  value: number;
  cpf: string;
  cardNumber: string;
  hour: string;
  storeId: string;
}
