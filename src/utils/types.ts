export interface IIngredient {
  _id: string;
  type: string;
  name: string;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

export interface IIngredientExt extends IIngredient {
  key: string;
}

export interface IUser {
  email: string;
  name: string;
}