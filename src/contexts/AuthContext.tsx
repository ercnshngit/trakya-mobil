import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import * as SecureStore from "expo-secure-store";
import { getFromSecureStore, saveToSecureStore } from "@/lib/secure-store";

const initialState = {
  user: null,
  token: null,
};

type InitialStateType = {
  user: any;
  token: string;
};

const AuthContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

function authReducer(state, action): InitialStateType {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        token: null,
      };
    }

    default: {
      return { ...state };
    }
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log("burası mı çalışıyor");
  useEffect(() => {
    (async () => {
      const token = await getFromSecureStore("token");
      const user = await getFromSecureStore("user");
      if (token && user) {
        dispatch({
          type: "LOGIN",
          payload: { token, user: { ...JSON.parse(user) } },
        });
      }
    })();
  }, []);

  const asyncDispatch = useCallback(async (action) => {
    switch (action.type) {
      case "LOGIN": {
        await saveToSecureStore("token", action.payload.token);
        await saveToSecureStore("user", JSON.stringify(action.payload.user));

        dispatch({
          type: "LOGIN",
          payload: action.payload,
        });
        break;
      }
      default:
        dispatch(action);
    }
  }, []);

  const value = { state, dispatch: asyncDispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useContext must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
