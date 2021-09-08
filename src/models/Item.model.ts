import { Category } from "../entities/category.entity";
import { Location } from '../entities/location.entity';
function itemModel(model = <any>{}) {
    return {
        id: model.id,
        name: model.name,
        description: model.description,
        category: model.category,
        location: model.location,
        inventoryNumber: model.inventoryNumber,
        creationDate: model.creationDate
    };
}

class ItemModel {
    id: string;
    name: String;
    description: String;
    category: Category;
    modifiedAt: Date;
    location: Location;
    inventoryNumber: String;
    creationDate: Date;


}

export { ItemModel, itemModel };