export interface IIngredient {
  readonly _id: string;
  readonly type: string;
  readonly name: string;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly calories: number;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
}

export interface IIngredientExt extends IIngredient {
  readonly key: string;
}

export interface IUser {
  email: string;
  name: string;
}