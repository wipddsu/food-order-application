import { useRef } from 'react';
import Modal from './Modal';
import Checkout from '../components/Checkout';

import { openModal, closeModal } from '../utils/modalController';
import { mealsInCart, calcTotalPrice } from '../utils/cartUtils';
import { currencyFormatter } from '../utils/formatting';

export default function Cart({ cart, onPlusMeal, onMinusMeal, onCartClose }) {
  const dialog = useRef();

  const allMeals = mealsInCart(cart) || [];

  const totalPrice = cart.length > 0 ? currencyFormatter.format(calcTotalPrice(allMeals)) : null;

  return (
    <>
      <Modal ref={dialog}>
        <Checkout totalPrice={totalPrice} totalMeals={allMeals} onCheckoutClose={() => closeModal(dialog)} />
      </Modal>
      <div className="cart">
        <h2>Your Cart</h2>
        {cart.length === 0 && <p>Your cart is currently empty. Please add a meal to your cart.</p>}
        {cart.length > 0 && (
          <div>
            <ul>
              {allMeals.map((item) => (
                <li className="cart-item" key={item.id}>
                  <p>{item.name}</p>
                  <div className="cart-item-actions">
                    <button onClick={() => onMinusMeal(item)}>-</button>
                    {item.total}
                    <button onClick={() => onPlusMeal(item)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <span className="cart-total">{totalPrice}</span>
          </div>
        )}
        <div className="modal-actions">
          <button className="text-button" onClick={onCartClose}>
            close
          </button>
          <button
            className="button"
            disabled={cart.length === 0 && true}
            onClick={() => {
              onCartClose();
              openModal(dialog);
            }}
          >
            Go to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
