
export class Category {
  id!: number;
  name!: string;
  parent_category?: Category;

  constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
}
