export type LoginFormType = {
  email: string;
  password: string;
};

export type CategoryFormType = {
  categoryId?: string;
  categoryName?: string;
  status?: "active" | "inactive";
  imageUrl?: string;
};

export type ProductFormType = {
  productId?: string;
  categoryId?: string;
  productName?: string;
  price?: number;
  deliveryPrice?: number;
  gender?: string;
  productDesc?: string;
  quantity?: number;
  status?: "active" | "inactive";
};
