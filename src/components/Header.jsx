import { useContext, useRef } from 'react';
import logo from '../assets/logo.jpg';
import Cart from './Cart';
import Modal from './Modal';
import Button from './UI/Button';

import { openModal, closeModal } from '../utils/modalController';
import { CartContext } from '../store/CartContext';

export default function Header() {
  const { cart, addItem, removeItem } = useContext(CartContext);
  const dialog = useRef();

  const totalQuantity = cart.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <>
      <Modal ref={dialog}>
        <Cart cart={cart} addItem={addItem} removeItem={removeItem} onCartClose={() => closeModal(dialog)} />
      </Modal>
      <header id="main-header">
        <h1 id="title">
          <img src={logo} alt="logo image" />
          REACTFOOD
        </h1>
        <Button textOnly onClick={() => openModal(dialog)}>
          Cart({totalQuantity})
        </Button>
      </header>
    </>
  );
}
