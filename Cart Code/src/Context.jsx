import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import cartItems from "./data";
import {
  CLEAR_CART,
  INCREASE,
  DECREASE,
  REMOVE,
  DISPLAY_ITEMS,
  LOADING,
} from "./actions";
import { getTotals } from "./utils";

const url = "https://www.course-api.com/react-useReducer-cart-project";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    // before putting the fetch functionality, the cart was not empty initially
    cart: new Map(),
    loading: false,
  };
  // console.log(initialState.cart);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalCost } = getTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  const fetchData = async () => {
    dispatch({type: LOADING})
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
