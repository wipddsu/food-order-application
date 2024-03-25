import { useRef } from 'react';
import Modal from './Modal';
import Checkout from '../components/Checkout';
import Button from './UI/Button';

import { openModal, closeModal } from '../utils/modalController';
import { calcTotalPrice } from '../utils/cartUtils';
import { currencyFormatter } from '../utils/formatting';

export default function Cart({ cart, addItem, removeItem, onCartClose }) {
  const dialog = useRef();

  const totalPrice = cart.length > 0 ? currencyFormatter.format(calcTotalPrice(cart)) : null;

  return (
    <>
      <Modal ref={dialog}>
        <Checkout totalPrice={totalPrice} totalMeals={cart} onCheckoutClose={() => closeModal(dialog)} />
      </Modal>
      <div className="cart">
        <h2>Your Cart</h2>
        {cart.length === 0 && <p>Your cart is currently empty. Please add a meal to your cart.</p>}
        {cart.length > 0 && (
          <div>
            <ul>
              {cart.map((item) => (
                <li className="cart-item" key={item.id}>
                  <p>{item.name}</p>
                  <div className="cart-item-actions">
                    <button onClick={() => removeItem(item.id)}>-</button>
                    {item.total}
                    <button onClick={() => addItem(item)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <span className="cart-total">{totalPrice}</span>
          </div>
        )}
        <div className="modal-actions">
          <Button textOnly onClick={onCartClose}>
            close
          </Button>
          <Button
            disabled={cart.length === 0 && true}
            onClick={() => {
              onCartClose();
              openModal(dialog);
            }}
          >
            Go to Checkout
          </Button>
        </div>
      </div>
    </>
  );
}
