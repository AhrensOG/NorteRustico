import React, { createContext, useReducer } from 'react'
import { reducer } from './reducer'

export const Context = createContext()

const initialState = {}

const GlobalContext = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default GlobalContext