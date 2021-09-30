import { Category } from "./category";
import { Location } from "./location";

export class Item {
  id: string = '';
  name: string = '';
  description: string = '';
  category: Category = new Category();
  modifiedAt: Date = new Date();
  location: Location = new Location();;
  inventoryNumber: string = '';
  creationDate: Date = new Date();


  constructor(init?: Partial<Item>) {
    Object.assign(this, init);
  }
}
