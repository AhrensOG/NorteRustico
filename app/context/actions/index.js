import { deleteFiles } from "@/app/firebase/deleteFiles";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import axios from "axios";
import { toast } from "sonner";

const SERVER_URL_PRODUCTS_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_PRODUCTS_ENDPOINT;
const SERVER_URL_CATEGORIES_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_CATEGORIES_ENDPOINT;
const SERVER_URL_TAGS_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_TAGS_ENDPOINT;
const SERVER_URL_PRODUCT_CATEGORIES_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_PRODUCT_CATEGORIES_ENDPOINT;
const SERVER_URL_PRODUCT_TAGS_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_PRODUCT_TAGS_ENDPOINT;
const SERVER_URL_PRODUCT_IMAGES_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGES_ENDPOINT;
const SERVER_URL_USERS_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_USERS_ENDPOINT;

const SERVER_URL_FAVOURITES_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_FAVOURITES_ENDPOINT;

const SERVER_URL_ORDER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ORDER_ENDPOINT;
const SERVER_URL_ORDER_PRODUCTS_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_ORDER_PRODUCTS_ENDPOINT;

////////////////////////// FILTERS //////////////////////////////////

const SERVER_URL_SEARCH_PRODUCTS_BY_NAME_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_SEARCH_PRODUCTS_BY_NAME_ENDPOINT;

const SERVER_URL_SEARCH_PRODUCTS_BY_SCORE_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_SEARCH_PRODUCTS_BY_SCORE_ENDPOINT;

const SERVER_URL_SEARCH_RELATED_PRODUCTS_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_SEARCH_RELATED_PRODUCTS_ENDPOINT;

////////////////////////// PAYMENT //////////////////////////////////

const SERVER_URL_DELIVERY_COST_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_DELIVERY_COST_ENDPOINT;

/////////////////////////////////////////////////////////////////////

export const getAllTags = async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL_TAGS_ENDPOINT}`);
    return dispatch({ type: "GET_ALL_TAGS", payload: res.data });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const getAllCategories = async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL_CATEGORIES_ENDPOINT}`);
    return dispatch({ type: "GET_ALL_CATEGORIES", payload: res.data });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const getAllProducts = async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL_PRODUCTS_ENDPOINT}`);
    return dispatch({ type: "GET_ALL_PRODUCTS", payload: res.data });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const getOneProduct = async (id, dispatch) => {
  try {
    if (id) {
      const res = await axios.get(`${SERVER_URL_PRODUCTS_ENDPOINT}?id=${id}`);
      return dispatch({ type: "GET_ONE_PRODUCT", payload: res.data });
    }
    return dispatch({ type: "GET_ONE_PRODUCT", payload: false });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const createProduct = async (values) => {
  try {
    const res = await axios.post(`${SERVER_URL_PRODUCTS_ENDPOINT}`, values);
    return res.data;
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const addCategoriesToProduct = async (productId, categoriesList) => {
  try {
    const body = {
      productId,
      categoriesList,
    };
    await axios.post(`${SERVER_URL_PRODUCT_CATEGORIES_ENDPOINT}`, body);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const addTagsToProduct = async (productId, tagsList) => {
  try {
    const body = {
      productId,
      tagsList,
    };
    await axios.post(`${SERVER_URL_PRODUCT_TAGS_ENDPOINT}`, body);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const addImagesToProduct = async (productId, files) => {
  try {
    const images = await uploadFiles(files);
    const body = {
      productId,
      images,
    };
    await axios.post(`${SERVER_URL_PRODUCT_IMAGES_ENDPOINT}`, body);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const updateProduct = async (values) => {
  try {
    const body = {
      ...values,
      productId: values.id,
    };
    const res = await axios.put(`${SERVER_URL_PRODUCTS_ENDPOINT}`, body);
    return res.data;
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const removeCategoriesToProduct = async (productId, categoriesList) => {
  try {
    const body = {
      productId,
      categoriesList,
    };
    await axios.put(`${SERVER_URL_PRODUCT_CATEGORIES_ENDPOINT}`, body);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const removeTagsToProduct = async (productId, tagsList) => {
  try {
    const body = {
      productId,
      tagsList,
    };
    await axios.put(`${SERVER_URL_PRODUCT_TAGS_ENDPOINT}`, body);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const removeImagesToProduct = async (productId, files) => {
  try {
    await deleteFiles(files);
    const body = {
      productId,
      images: files,
    };
    await axios.put(`${SERVER_URL_PRODUCT_IMAGES_ENDPOINT}`, body);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${SERVER_URL_PRODUCTS_ENDPOINT}?id=${id}`);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const createCategory = async (name) => {
  try {
    await axios.post(`${SERVER_URL_CATEGORIES_ENDPOINT}`, name);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${SERVER_URL_CATEGORIES_ENDPOINT}?id=${id}`);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const createTag = async (name) => {
  try {
    await axios.post(`${SERVER_URL_TAGS_ENDPOINT}`, name);
  } catch (error) {
    console.log(error);
    throw new Error("Error interno del servidor");
  }
};

export const deleteTag = async (id) => {
  try {
    await axios.delete(`${SERVER_URL_TAGS_ENDPOINT}?id=${id}`);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const updateUser = async (values, dispatch) => {
  try {
    const res = await axios.put(`${SERVER_URL_USERS_ENDPOINT}`, values);
    return dispatch({ type: "UPDATED_USER", payload: res.data });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

////////////////////////// FAVOURITES ////////////////////////////////

export const getFavouriteProducts = async (values, dispatch) => {
  try {
    const res = await axios.get(
      `${SERVER_URL_FAVOURITES_ENDPOINT}?user_id=${values}`
    );
    return dispatch({ type: "FAVOURITE_PRODUCTS", payload: res.data });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const addProductToFavourites = async (values) => {
  try {
    await axios.post(
      `${SERVER_URL_FAVOURITES_ENDPOINT}?product_id=${values.productId}&user_id=${values.userId}`
    );
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const removeProductToFavourites = async (values) => {
  try {
    await axios.delete(
      `${SERVER_URL_FAVOURITES_ENDPOINT}?product_id=${values.productId}&user_id=${values.userId}`
    );
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

////////////////////////// FILTERS //////////////////////////////////

export const searchProductsByName = async (search, dispatch) => {
  try {
    if (search) {
      const res = await axios.get(
        `${SERVER_URL_SEARCH_PRODUCTS_BY_NAME_ENDPOINT}?name=${search}`
      );
      if (res.data.length === 0) {
        return toast.info(`No se encontraron productos con "${search}"`);
      }
      return dispatch({ type: "SEARCH_PRODUCTS_BY_NAME", payload: res.data });
    }
    return dispatch({ type: "SEARCH_PRODUCTS_BY_NAME", payload: search });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const searchProductsByScore = async (dispatch) => {
  try {
    const res = await axios.get(
      `${SERVER_URL_SEARCH_PRODUCTS_BY_SCORE_ENDPOINT}`
    );
    return dispatch({ type: "SEARCH_PRODUCTS_BY_SCORE", payload: res.data });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const searchRelatedProducts = async (categories, dispatch) => {
  try {
    const res = await axios.post(
      `${SERVER_URL_SEARCH_RELATED_PRODUCTS_ENDPOINT}`,
      categories
    );
    return dispatch({ type: "SEARCH_RELATED_PRODUCTS", payload: res.data });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

//////////////////////////// CART ////////////////////////////////////

export const addProductToCart = (product, dispatch) => {
  return dispatch({
    type: "ADD_PRODUCT_TO_CART",
    payload: product,
  });
};

export const removeProductFromCart = (product, dispatch) => {
  return dispatch({
    type: "REMOVE_PRODUCT_FROM_CART",
    payload: product,
  });
};

export const emptyCart = (dispatch) => {
  return dispatch({
    type: "EMPTY_CART",
  });
};

//////////////////////////// PAYMENT ////////////////////////////////////

export const savePaymentInformation = (data, dispatch) => {
  return dispatch({
    type: "PAYMENT_INFORMATION",
    payload: data,
  });
};

export const getDeliveryCost = async (data, dispatch) => {
  try {
    const res = await axios.get(
      `${SERVER_URL_DELIVERY_COST_ENDPOINT}?weight=${data.totalWeight}&volume=${data.totalVolume}&postcode=${data.postalCode}`
    );
    return dispatch({
      type: "DELIVERY_COST",
      payload: res.data,
    });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const deleteDeliveryCostInformation = (dispatch) => {
  return dispatch({
    type: "DELETE_DELIVERY_COST_INFORMATION",
  });
};

//////////////////////////// PAYMENT ////////////////////////////////////

export const createOrder = async (data, dispatch) => {
  try {
    const body = {
      userId: data.user.id,
      status: "Pending",
      totalPrice: data.cartTotalPrice,
      deliveryCost: data.payment.deliveryCost.tarifaConIva.total,
      cartPrice: data.cartPrice,
      discountedCartPrice: data.discountedCartPrice,
      email: data.payment.email,
      name: data.payment.name,
      surname: data.payment.surname,
      street: data.payment.street,
      streetNumber: data.payment.streetNumber,
      flat: data.payment.flat,
      apartament: data.payment.apartament,
      postalCode: data.payment.postalCode,
      country: data.payment.country,
      province: data.payment.province,
      city: data.payment.city,
      dni: data.payment.dni,
      phone: data.payment.phone,
    };
    const res = await axios.post(SERVER_URL_ORDER_ENDPOINT, body);
    return res.data;
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const addProductsToOrder = async (data) => {
  try {
    const res = await axios.post(SERVER_URL_ORDER_PRODUCTS_ENDPOINT, data);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};
