import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { isUserLogged } from "./actions/isUserLogged";
import {
  getAllCategories,
  getAllProducts,
  getAllTags,
  searchProductsByScore,
} from "./actions";

export const Context = createContext();

const initialState = {};

const GlobalContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = async () => {
      await isUserLogged(dispatch);
      await searchProductsByScore(dispatch);
      await getAllProducts(dispatch);
      await getAllCategories(dispatch);
      await getAllTags(dispatch);
    };
    user();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default GlobalContext;
