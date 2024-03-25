import { useContext } from 'react';
import Modal from './UI/Modal';
import Button from './UI/Button';

import { calcTotalPrice } from '../utils/cartUtils';
import { currencyFormatter } from '../utils/formatting';
import { UserProgressContext } from '../store/UserProgressContext';
import { CartContext } from '../store/CartContext';

export default function Cart() {
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);
  const { items, addItem, removeItem } = useContext(CartContext);

  const totalPrice = items.length > 0 ? currencyFormatter.format(calcTotalPrice(items)) : null;

  function handleHideCart() {
    hideCart();
  }

  function handleGoToCheckout() {
    showCheckout();
  }

  return (
    <Modal className="cart" open={progress === 'cart'} onClose={progress === 'cart' ? handleHideCart : null}>
      <h2>Your Cart</h2>
      {items.length === 0 && <p>Your cart is currently empty. Please add a meal to your cart.</p>}
      {items.length > 0 && (
        <div>
          <ul>
            {items.map((item) => (
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
        <Button textOnly onClick={handleHideCart}>
          close
        </Button>
        <Button disabled={items.length === 0 && true} onClick={handleGoToCheckout}>
          Go to Checkout
        </Button>
      </div>
    </Modal>
  );
}
