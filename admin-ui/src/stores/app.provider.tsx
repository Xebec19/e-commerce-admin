import LocalStorage from "@/lib/local-storage.util";
import { RootState } from "@/types/store.type";
import { createContext, useReducer, ReactNode, useContext } from "react";

const initialState: RootState = {
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {},
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
      LocalStorage.token = "";
      return { ...state, isLoggedIn: false };
    }
    default:
      return state;
  }
};

const AppContext = createContext<RootState>({
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {},
});

export default function AppProvider({ children }: { children: ReactNode }) {
  const [values, dispatch] = useReducer(reducerFn, initialState);

  const handleLogin = () => {
    dispatch({ type: actions.userLoggedIn });
  };

  const handleLogout = () => {
    dispatch({ type: actions.userLoggedOut });
  };

  return (
    <AppContext.Provider value={{ ...values, handleLogin, handleLogout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppProvider() {
  return useContext(AppContext);
}
