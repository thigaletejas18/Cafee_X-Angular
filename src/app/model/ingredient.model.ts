
export interface IIngredient {
   id?: number | null;
   name?: string;
   description?: string;
   cost?: number | null;
   quantity?: number | null;
   minQuantity?: number | null;
   unit?: string;
   image?: string;
}

export class Ingredient implements IIngredient {
   id?: number | null;
   name?: string;
   description?: string;
   cost?: number | null;
   quantity?: number | null;
   minQuantity?: number | null;
   unit?: string;
   image?: string;



   constructor(
       id?: number | null,
       name?: string,
       description?: string,
       cost?: number | null,
       quantity?: number | null,
       minQuantity?: number | null,
       unit?: string,
       image?: string
   ) {
       this.id = id;
       this.name = name;
       this.description = description;
       this.cost = cost;
       this.quantity = quantity;
       this.minQuantity = minQuantity;
       this.unit = unit;
       this.image = image;
   }
}