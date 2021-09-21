
export class Category {
  id: string = '';
  name: string = '';
  parent_category?: Category;

  constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
}
