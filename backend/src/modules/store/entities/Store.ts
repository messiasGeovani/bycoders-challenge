import { v4 as uuid } from "uuid";

export class Store {
  public readonly id: string;
  public name: string;
  public owner: string;
  public transations?: [];

  constructor(props: Omit<Store, 'id'>, id?: string) {
    Object.assign(this, props)

    if(!id) {
      this.id = uuid()
    } else {
      this.id = id
    }
  }
}
