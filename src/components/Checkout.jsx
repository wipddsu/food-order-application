import { useRef, useState } from 'react';
import Modal from './Modal';
import OrderSuccess from './OrderSuccess';
import Button from './UI/Button';
import Input from './UI/Input';

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
        <p>Total Amount: {totalPrice}</p>
        <form onSubmit={handleSubmit}>
          <Input
            inputName="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          >
            Full Name
          </Input>
          <Input
            inputName="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          >
            E-Mail Address
          </Input>
          <Input
            inputName="street"
            type="text"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          >
            Street
          </Input>
          <div className="control-row meal-item-actions">
            <Input
              inputName="postal-code"
              type="text"
              value={formData['postal-code']}
              onChange={(e) => setFormData({ ...formData, 'postal-code': e.target.value })}
            >
              Postal Code
            </Input>
            <Input
              inputName="city"
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            >
              City
            </Input>
          </div>
          {error && <p>{error.message}</p>}
          <div className="modal-actions">
            <Button textOnly type="button" onClick={onCheckoutClose}>
              close
            </Button>
            <Button>Submit Order</Button>
          </div>
        </form>
      </div>
    </>
  );
}
