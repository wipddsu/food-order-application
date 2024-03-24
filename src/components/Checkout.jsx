import { useRef, useState } from 'react';
import Modal from './Modal';
import OrderSuccess from './OrderSuccess';

import { openModal, closeModal } from '../utils/modalController';

export default function Checkout({ totalPrice, totalMeals, onCheckoutClose }) {
  const dialog = useRef();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    'postal-code': '',
    city: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();

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
        onCheckoutClose();
        openModal(dialog);
        setFormData({
          name: '',
          email: '',
          street: '',
          'postal-code': '',
          city: '',
        });
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
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="control">
            <label htmlFor="email">E-Mail Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="control">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            />
          </div>
          <div className="control-row meal-item-actions">
            <div className="control">
              <label htmlFor="postal-code">Postal Code</label>
              <input
                type="text"
                id="postal-code"
                name="postal-code"
                value={formData['postal-code']}
                onChange={(e) => setFormData({ ...formData, 'postal-code': e.target.value })}
              />
            </div>
            <div className="control">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>
          {error && <p>{error.message}</p>}
          <div className="modal-actions">
            <button type="button" className="text-button" onClick={onCheckoutClose}>
              close
            </button>
            <button className="button">Submit Order</button>
          </div>
        </form>
      </div>
    </>
  );
}
