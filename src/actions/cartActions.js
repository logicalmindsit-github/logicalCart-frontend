// cartActions.js

export const addToCart = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: product,
  };
};

// cartReducer.js
const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    // Handle other cart actions like removing items, updating quantities, etc.
    default:
      return state;
  }
};

export default cartReducer;