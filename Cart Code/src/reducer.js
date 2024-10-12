import {
  CLEAR_CART,
  INCREASE,
  DECREASE,
  REMOVE,
  DISPLAY_ITEMS,
  LOADING,
} from "./actions";

const reducer = (state, action) => {
  const { type } = action;
  if (type === CLEAR_CART)
    return { ...state, cart: new Map(), total: { bill: 0, quantity: 0 } };
  else if (type === REMOVE) {
    const { id } = action.payload;
    // old way, iterating over array to remove items
    /*const newCartArr = Array.from(state.cart).filter((item) => {
      return item[0] !== id;
    });

    return { ...state, cart: new Map(newCartArr) };*/

    // new way, using map
    const newCart = new Map(state.cart);
    newCart.delete(id);
    return { ...state, cart: newCart };
  }
  
  else if (type === INCREASE) {
    const { id } = action.payload;
    const newCart = new Map(state.cart);
    const item = newCart.get(id);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(id, newItem);
    return { ...state, cart: newCart };
  }
  
  else if (type === DECREASE) {
    const id = action.payload.id;
    const newCart = new Map(state.cart);
    const item = newCart.get(id);

    if (newCart.get(id).amount == 1) {
      newCart.delete(id);
      return { ...state, cart: newCart };
    }

    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(id, newItem);
    return { ...state, cart: newCart };
  }

  else if (type === LOADING)
    return {...state, loading: true};

  else if (type === DISPLAY_ITEMS) {
    const newCart = new Map(action.payload.cart.map((item) => [item.id, item]))
    return { ...state, loading: false, cart: newCart };
  }

  throw new Error(`no matching action type ${type}`);
};

export default reducer;
