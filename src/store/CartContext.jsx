import { createContext, useReducer, useState } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  resetCart: () => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      {
        const updatedItems = [...state.items];
        const exisistingCartItemIndex = updatedItems.findIndex((item) => item.id === action.item.id);
        const exisistingCartItem = updatedItems[exisistingCartItemIndex];

        if (exisistingCartItemIndex > -1) {
          const updatedItem = {
            ...exisistingCartItem,
            total: exisistingCartItem.total + 1,
          };
          updatedItems[exisistingCartItemIndex] = updatedItem;
        } else {
          updatedItems.push({
            ...action.item,
            total: 1,
          });
        }

        return {
          ...state,
          items: updatedItems,
        };
      }
      break;
    case 'REMOVE_ITEM':
      {
        const updatedItems = [...state.items];
        const updatedItemsIndex = updatedItems.findIndex((item) => item.id === action.id);

        const updatedItem = {
          ...updatedItems[updatedItemsIndex],
        };

        if (updatedItem.total === 1) {
          updatedItems.splice(updatedItemsIndex, 1);
        } else {
          updatedItem.total = updatedItem.total - 1;
          updatedItems[updatedItemsIndex] = updatedItem;
        }

        return {
          ...state,
          items: updatedItems,
        };
      }
      break;
  }
  return state;
}

export default function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatchCartAction({
      type: 'ADD_ITEM',
      item,
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: 'REMOVE_ITEM',
      id,
    });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export { CartContext };
