export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATED_USER":
      return {
        ...state,
        user: action.payload,
      };
    // case "GET_ALL_USERS":
    //   return {
    //     ...state,
    //     users: action.payload,
    //   };
    case "GET_ALL_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "GET_ALL_TAGS":
      return {
        ...state,
        tags: action.payload,
      };
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "SEARCH_PRODUCTS_BY_NAME":
      return {
        ...state,
        searchedProducts: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
