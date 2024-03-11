import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { isUserLogged } from "./actions/isUserLogged";
import {
  getAllCategories,
  getAllProducts,
  getAllTags,
  getFavouriteProducts,
  getOrganization,
  searchProductsByScore,
} from "./actions";

export const Context = createContext();

const initialState = {};

const GlobalContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getData = async () => {
      try {
        await getOrganization(dispatch);
        await isUserLogged(dispatch);
        await searchProductsByScore(dispatch);
        await getAllProducts(dispatch);
        await getAllCategories(dispatch);
        await getAllTags(dispatch);
      } catch (error) {
        return error;
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (state.user) {
        try {
          await getFavouriteProducts(state.user.id, dispatch);
        } catch (error) {
          return error;
        }
      }
    };
    getData();
  }, [state.user]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default GlobalContext;
