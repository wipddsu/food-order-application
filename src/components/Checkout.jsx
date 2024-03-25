import { useState, useContext } from 'react';
import Modal from './UI/Modal';
import Button from './UI/Button';
import Input from './UI/Input';

import { calcTotalPrice } from '../utils/cartUtils';
import { currencyFormatter } from '../utils/formatting';
import { UserProgressContext } from '../store/UserProgressContext';
import { CartContext } from '../store/CartContext';
import useHttp from '../hooks/useHttp';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const initialFormData = {
  name: '',
  email: '',
  street: '',
  'postal-code': '',
  city: '',
};

export default function Checkout() {
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const { items, clearCart } = useContext(CartContext);
  const totalPrice = items.length > 0 ? currencyFormatter.format(calcTotalPrice(items)) : null;

  const [formData, setFormData] = useState(initialFormData);

  const { data, isFetching, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig);

  async function handleSubmit(e) {
    e.preventDefault();

    sendRequest(
      JSON.stringify({
        order: {
          customer: formData,
          items: items,
        },
      })
    );
  }

  function handleClose() {
    hideCheckout();
  }

  function handleOrderFinish() {
    hideCheckout();
    clearCart();
    clearData();
    setFormData(initialFormData);
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleClose}>
        close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isFetching) {
    actions = <p>Sending order data...</p>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === 'checkout'} onClose={handleOrderFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully</p>
        <p>We will get back to you with more detail via email within the next few minutes</p>
        <div className="modal-actions">
          <Button onClick={handleOrderFinish}>Okay</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={progress === 'checkout'} onClose={handleClose}>
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
          <div className="modal-actions">{actions}</div>
        </form>
      </div>
    </Modal>
  );
}
