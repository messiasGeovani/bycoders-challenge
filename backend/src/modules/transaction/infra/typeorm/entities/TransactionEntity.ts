import { StoreEntity } from "@modules/store/infra/typeorm/entities/StoreEntity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransactionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "transaction_type" })
  type: string;

  @Column({ name: "transaction_date" })
  date: Date;

  @Column({ type: "real" })
  value: number;

  @Column()
  cpf: string;

  @Column({ name: "card_number" })
  cardNumber: string;

  @Column({ name: "transaction_hour" })
  hour: string;

  @ManyToOne((type) => StoreEntity, (transactions) => Transaction, { eager: true })
  store: StoreEntity;
}
