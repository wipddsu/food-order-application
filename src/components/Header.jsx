import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from './UI/Button';

import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';

export default function Header() {
  const { progress, showCart } = useContext(UserProgressContext);
  const { items } = useContext(CartContext);

  const totalQuantity = items.reduce((acc, curr) => acc + curr.total, 0);

  function handleShowCart() {
    showCart();
    console.log(progress);
  }

  return (
    <header id="main-header">
      <h1 id="title">
        <img src={logo} alt="logo image" />
        REACTFOOD
      </h1>
      <Button textOnly onClick={handleShowCart}>
        Cart({totalQuantity})
      </Button>
    </header>
  );
}
