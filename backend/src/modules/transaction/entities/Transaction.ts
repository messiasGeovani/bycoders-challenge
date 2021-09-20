import { StoreEntity } from "@modules/store/infra/typeorm/entities/StoreEntity";
import { v4 as uuid } from "uuid";

export class Transaction {
  public readonly id: string;
  public type: string;
  public date: string;
  public value: number;
  public cpf: string;
  public cardNumber: string;
  public hour: string;
  public store: StoreEntity;

  constructor(props: Omit<Transaction, 'id'>, id?: string) {
    Object.assign(this, props)

    if(!id) {
      this.id = uuid()
    } else {
      this.id = id
    }
  }
}
