import Modal from './layouts/Modal';

export default function Cart() {
  return (
    <Modal>
      <div className="cart">
        <h2>Your Cart</h2>
        <ul>
          <li className="cart-item">
            <p>meal name1</p>
            <div className="cart-item-actions">
              <button>-</button>1<button>+</button>
            </div>
          </li>
          <li className="cart-item">
            <p>meal name2</p>
            <div className="cart-item-actions">
              <button>-</button>3<button>+</button>
            </div>
          </li>
        </ul>
        <span className="cart-total">$ 72</span>
        <div className="modal-actions">
          <button className="text-button">close</button>
          <button className="button">Go to Checkout</button>
        </div>
      </div>
    </Modal>
  );
}
