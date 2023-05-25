"use client";

import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  favorites: Array<any>;
};

type ActionType = {
  value: any;
  type: string;
};

const initialState: StateType = {
  favorites: [],
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "MUTATE_FAVORITES":
      return {
        ...state,
        favorites: action.value,
      };
    default:
      return state;
  }
};

export const PhotoContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PhotoContext.Provider value={{ state, dispatch }}>
      {children}
    </PhotoContext.Provider>
  );
};
