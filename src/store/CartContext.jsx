import { createContext, useState } from 'react';

import { mealsInCart } from '../utils/cartUtils';

const CartContext = createContext({
  addItem: (item) => {},
  removeItem: (id) => {},
  resetCart: () => {},
});

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const newCart = mealsInCart(cart);

  function addItem(item) {
    setCart((prev) => [...prev, item]);
  }

  function removeItem(id) {
    const index = cart.findIndex((item) => item.id === id);
    const cartCopy = [...cart];
    const removedProduct = cartCopy.splice(index, 1);

    setCart(cartCopy);
  }

  const cartContext = {
    cart: newCart,
    addItem,
    removeItem,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export { CartContext };
