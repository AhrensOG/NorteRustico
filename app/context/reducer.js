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
    case "GET_ONE_PRODUCT":
      return {
        ...state,
        productDetail: action.payload,
      };

    /////////////////////// FAVOURITES //////////////////////////

    case "FAVOURITE_PRODUCTS":
      return {
        ...state,
        favouriteProducts: action.payload,
      };

    /////////////////////// CART //////////////////////////

    case "ADD_PRODUCT_TO_CART":
      if (!state.cart) {
        const total = action.payload.price * action.payload.items;
        const discountedTotal =
          action.payload.discountedPrice * action.payload.items;
        return {
          ...state,
          cart: [action.payload],
          cartPrice: total,
          discountedCartPrice: discountedTotal,
          cartItems: action.payload.items,
        };
      } else {
        const products = state.cart;
        const index = products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          products[index] = action.payload;
        } else {
          products.push(action.payload);
        }

        let totalPrice = 0;
        let discountedTotalPrice = 0;
        let totalItems = 0;
        products.forEach((product) => {
          const total = parseFloat(product.price) * product.items;
          const discountedTotal =
            parseFloat(product.discountedPrice) * product.items;

          discountedTotalPrice += discountedTotal;
          totalPrice += total;
          totalItems += product.items;
        });

        return {
          ...state,
          cart: products,
          cartPrice: totalPrice,
          discountedCartPrice: discountedTotalPrice,
          cartItems: totalItems,
        };
      }

    case "REMOVE_PRODUCT_FROM_CART":
      const products = state.cart;
      const index = products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        products.splice(index, 1);
      }

      let totalPrice = 0;
      let discountedTotalPrice = 0;
      let totalItems = 0;
      products.forEach((product) => {
        const total = parseFloat(product.price) * product.items;
        const discountedTotal =
          parseFloat(product.discountedPrice) * product.items;

        discountedTotalPrice += discountedTotal;
        totalPrice += total;
        totalItems += product.items;
      });

      return {
        ...state,
        cart: products,
        cartPrice: totalPrice,
        discountedCartPrice: discountedTotalPrice,
        cartItems: totalItems,
      };

    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
      };

    /////////////////////// FILTERS //////////////////////////
    case "SEARCH_PRODUCTS_BY_NAME":
      return {
        ...state,
        searchedProducts: action.payload,
      };
    case "SEARCH_PRODUCTS_BY_SCORE":
      return {
        ...state,
        searchedProductsByScore: action.payload,
      };
    case "SEARCH_RELATED_PRODUCTS":
      return {
        ...state,
        searchedRelatedProducts: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
