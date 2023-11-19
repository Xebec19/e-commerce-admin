import { RootState } from "@/types/store.type";
import { createContext, useReducer, ReactNode, useContext } from "react";

const initialState: RootState = {
  isLoggedIn: false,
  handleLogin: () => {},
};

const actions = {
  userLoggedIn: "USER_LOGGED_IN",
  userLoggedOut: "USER_LOGGED_OUT",
};

const reducerFn = (
  state: RootState,
  action: { type: string; payload?: object | string }
): RootState => {
  switch (action.type) {
    case actions.userLoggedIn: {
      return { ...state, isLoggedIn: true };
    }
    case actions.userLoggedOut: {
      return { ...state, isLoggedIn: false };
    }
    default:
      return state;
  }
};

const AppContext = createContext<RootState>({
  isLoggedIn: false,
  handleLogin: () => {},
});

export default function AppProvider({ children }: { children: ReactNode }) {
  const [values, dispatch] = useReducer(reducerFn, initialState);

  const handleLogin = () => {
    dispatch({ type: actions.userLoggedIn });
  };

  return (
    <AppContext.Provider value={{ ...values, handleLogin }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppProvider() {
  return useContext(AppContext);
}
