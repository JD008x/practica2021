import { Category} from "../entities/category.entity";
import { EntityManager } from "@mikro-orm/core";

export { getCategoryByname, saveCategory };
      
      
async function getCategoryByname(em: EntityManager, name: string): Promise<Error | Category | null> {
      if (!(em instanceof EntityManager))
          return Error("invalid request");
  
  
    try {
        const category = await em.findOne(Category, { name: name });
        return category;
      } catch (ex) {
          if(ex instanceof Error)
          return ex;
          
          return null;
      }
}
  
  async function saveCategory(em: EntityManager, category: Partial<Category>): Promise<Error | Category> {
      if (!(em instanceof EntityManager))
          return Error("invalid request");
  
      if (!category || typeof category !== "object")
          return Error("invalid params");
  
      try {
          const userExists = await em.findOne(Category, { id: category.id });
          if (userExists)
              return Error("item already exists");
      } catch (ex) {
          if(ex instanceof Error)
          return ex;   
          
      }
  
      const categoryModel = new Category({
            id: category.id,
            name: category.name,
            parent_category: category.parent_category,         
      });
  
      try {
          await em.persistAndFlush([categoryModel]);
         
      } catch (ex) {
          if(ex instanceof Error)
          return ex;
          
      }
  
      return categoryModel;
  }