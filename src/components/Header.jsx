import { useRef } from 'react';
import logo from '../assets/logo.jpg';
import Cart from './Cart';
import Modal from './layouts/Modal';

import { openModal, closeModal } from '../utils/modalController';

export default function Header({ cart, onPlusMeal, onMinusMeal }) {
  const dialog = useRef();

  return (
    <>
      <Modal ref={dialog}>
        <Cart cart={cart} onPlusMeal={onPlusMeal} onMinusMeal={onMinusMeal} onCartClose={() => closeModal(dialog)} />
      </Modal>
      <header id="main-header">
        <h1 id="title">
          <img src={logo} alt="logo image" />
          REACTFOOD
        </h1>
        <button className="text-button" onClick={() => openModal(dialog)}>
          Cart{cart.length > 0 && `(${cart.length})`}
        </button>
      </header>
    </>
  );
}
