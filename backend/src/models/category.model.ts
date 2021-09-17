import { Category } from "../entities/category.entity";

function categoryModel(model = <any>{}) {
	return {
        id : model.id,
        name : model.name,
        parent_category : model.parent_category,
	};
}

class CategoryModel {
    id: number;
    name: string;
    parent_category: Category
}

  export { CategoryModel, categoryModel };