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

export interface IIngredientsDictionary {
  [key: string]: IIngredient
}

export interface IUser {
  email: string;
  name: string;
}

export interface IOrder {
  readonly _id: string;
  readonly ingredients: ReadonlyArray<string>;
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
}

export interface IOrdersMessage {
  readonly orders: ReadonlyArray<IOrder>;
  readonly total: number;
  readonly totalToday: number;
}