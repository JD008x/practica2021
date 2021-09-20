import { Category } from "shared";

export interface Item {
  id: string;
  name: String;
  description: String;
  category?: Category;
  modifiedAt: Date;
  location?: Location;
  inventoryNumber: String;
  creationDate: Date;
}

