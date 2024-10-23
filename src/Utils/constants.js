const LOGIN_PATH = "/login";
const HOME_PATH = "/";
const SIGNUP_PATH = "/register";
const PRODUCTDETAILS_PATH = (id) => `/productsdetails/${id || ":id"}`;
const PRODUCT_FORM = (id) => `/addProductForm/${id || ":id"}`;
const ADDPRODUCT_FORM = "/addProductForm";
const PRODUCT_TABLE = "/products";
const CATEGORIES_FORM = (id) => `/categoriesForm/${id || ":id"}`;
const ADDCATEGORIES_FORM = "/addcategoriesForm";
const CATEGORIES_TABLE = "/categories";

export {
  LOGIN_PATH,
  HOME_PATH,
  SIGNUP_PATH,
  PRODUCTDETAILS_PATH,
  PRODUCT_FORM,
  PRODUCT_TABLE,
  ADDPRODUCT_FORM,
  CATEGORIES_FORM,
  CATEGORIES_TABLE,
  ADDCATEGORIES_FORM,
};
