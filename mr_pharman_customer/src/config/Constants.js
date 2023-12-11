import { Dimensions } from "react-native";

export const base_url = "enter_admin_url/";
export const api_url = "enter_admin_url/api/";
export const img_url = "enter_admin_url/uploads/";
export const chat_icon = img_url + "chat_icons/patient.png";
export const app_name = "Mr.Pharman";

//Common api
export const customer_app_settings = "customer_app_setting";
export const customer_add_address = "customer/add_address";
export const customer_update_address = "customer/update_address";
export const customer_edit_address = "customer/edit_address";
export const customer_get_address = "customer/all_addresses";
export const customer_get_blog = "customer/get_blog";
export const customer_get_faq = "get_faq";
export const customer_notification = "get_notifications";
export const get_module_banners = "customer/get_module_banners";
export const customer_privacy_policy = "get_privacy_policy";
export const customer_get_profile = "customer/get_profile";
export const customer_profile_picture = "customer/profile_picture";
export const customer_profile_picture_update = "customer/profile_picture_update";
export const customer_profile_update = "customer/profile_update";
export const check_promo_code = "customer/check_promo";
export const promo_code = "customer/get_promo";
export const terms_and_conditions = "get_terms_and_conditions";

//auth function api
export const customer_check_phone = "customer/check_phone";
export const customer_reset_password = "customer/reset_password";
export const customer_login = "customer/login";
export const customer_forget_password = "customer/forget_password";
export const customer_registration = "customer/register";

//pharmacy flow api
export const get_payment_modes = "customer/get_payment_mode";
export const order_rating = "customer/vendor_rating";
export const show_vendor_list = "customer/vendor_list";
export const other_charges = "customer/get_taxes";
export const create_pharmacy_order = "customer/pharmacy_order";
export const pharmacy_sub_categories = "customer/vendor_sub_category";
export const pharmacy_categories = "customer/vendor_category";
export const pharmacy_products = "customer/vendor_products";
export const upload_prescription = "customer/upload_prescription";
export const pharmacy_order_list = "customer/get_order_list";
export const status_change = "order_status_change";

//Size
export const screenHeight = Math.round(Dimensions.get("window").height);
export const screenWidth = Math.round(Dimensions.get("window").width);
export const height_40 = Math.round((40 / 100) * screenHeight);
export const height_50 = Math.round((50 / 100) * screenHeight);
export const height_60 = Math.round((60 / 100) * screenHeight);
export const height_35 = Math.round((35 / 100) * screenHeight);
export const height_20 = Math.round((20 / 100) * screenHeight);
export const height_30 = Math.round((30 / 100) * screenHeight);
export const height_17 = Math.round((17 / 100) * screenHeight);

//Path
export const logo = require(".././assets/img/logo.png"); 
export const tablet = require(".././assets/img/tablet.png");
export const discount = require(".././assets/img/discount.png");
export const location = require(".././assets/img/location.png");
export const upload_path = require(".././assets/img/upload_icon.png");
export const login_entry_img = require(".././assets/img/login_entry_img.png");
export const promo_apply = require(".././assets/img/apply.png");
export const wallet_imge = require(".././assets/img/wallet.png"); 
export const medicine = require(".././assets/img/medicine.png");
export const app_update = require('.././assets/json/app_update.json'); 

//json path
export const loader = require(".././assets/json/loader.json");

//Color Arrays
export const light_colors = [
  "#e6ffe6",
  "#f9f2ec",
  "#f9ecf2",
  "#ffe6ff",
  "#e6ffee",
  "#ffe6e6",
  "#ffffe6",
  "#ffe6e6",
  "#ffe6f9",
  "#ebfaeb",
  "#ffffe6",
  "#ffe6f0",
  "#fae6ff",
  "#e6ffe6",
  "#fff2e6",
  "#ffe6f0",
  "#e6ffee",
  "#a6abde",
];

//Lottie

//Font Family
export const light = "Metropolis-Light";
export const regular = "CheyenneSans-Regular";
export const bold = "Metropolis-Bold";

//Map
export const GOOGLE_KEY = "enter_map_key";
export const LATITUDE_DELTA = 0.015;
export const LONGITUDE_DELTA = 0.0152;

//Util
export const month_name = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
