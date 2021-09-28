import { Category } from "./category";
import { Location } from "./location";

export class Item {
  id: string = '';
  name: string = '';
  description: string = '';
  user: string = '';
  location: Location = new Location();;
  category: Category = new Category();
  inventoryNumber: string = '';
  creationDate: Date = new Date();
  modifiedAt: Date = new Date();
  deletedAt: boolean = false;

  constructor(init?: Partial<Item>) {
    Object.assign(this, init);
  }
}
