const LOGIN_PATH = "/login";
const HOME_PATH = "/";
const SIGNUP_PATH = "/register";
const PRODUCTDETAILS_PATH = (id) => `/productsdetails/${id || ":id"}`;

export { LOGIN_PATH, HOME_PATH, SIGNUP_PATH, PRODUCTDETAILS_PATH };
