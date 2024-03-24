import { useRef, useState } from 'react';
import Modal from './layouts/Modal';
import OrderSuccess from './OrderSuccess';

import { openModal, closeModal } from '../utils/modalController';
import { CartContext } from '../store/CartContext';

export default function Checkout({ totalPrice, totalMeals, onCheckoutClose }) {
  const dialog = useRef();
  const [isCreate, setIsCreate] = useState(false);
  const [error, setError] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const formData = Object.fromEntries(fd.entries());

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: {
            customer: formData,
            items: totalMeals || [],
          },
        }),
      });
      const resData = await response.json();

      if (response.status === 400) {
        throw new Error(resData.message);
      }

      if (!response.ok) {
        throw new Error('An error occurred in fetching!');
      }

      if (response.status === 201) {
        setIsCreate(true);
      }
    } catch (error) {
      setError({
        message: error.message,
      });
    }
  }

  return (
    <>
      <Modal ref={dialog}>
        <OrderSuccess onCloseSuccess={() => closeModal(dialog)} />
      </Modal>
      <div>
        <h2>Checkout</h2>
        <p>Total Amount: ${totalPrice}</p>
        <form onSubmit={handleSubmit}>
          <div className="control">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="control">
            <label htmlFor="email">E-Mail Address</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="control">
            <label htmlFor="street">Street</label>
            <input type="text" id="street" name="street" />
          </div>
          <div className="control-row meal-item-actions">
            <div className="control">
              <label htmlFor="postal-code">Postal Code</label>
              <input type="postalcode" id="postal-code" name="postal-code" />
            </div>
            <div className="control">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" />
            </div>
          </div>
          {error && <p>{error.message}</p>}
          <div className="modal-actions">
            <button type="button" className="text-button" onClick={onCheckoutClose}>
              close
            </button>
            <button
              className="button"
              onClick={() => {
                if (isCreate) {
                  onCheckoutClose();
                  openModal(dialog);
                }
              }}
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
