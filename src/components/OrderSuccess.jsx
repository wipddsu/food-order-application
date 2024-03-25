import { useContext } from 'react';
import Modal from './UI/Modal';
import Button from './UI/Button';

import { CartContext } from '../store/CartContext';

export default function OrderSuccess({ onCloseSuccess }) {
  const { resetCart } = useContext(CartContext);

  return (
    <Modal open={progress === 'checkout'}>
      <div>
        <h2>Success!</h2>
        <p>Your order was submitted successfully</p>
        <p>We will get back to you with more detail via email within the next few minutes</p>
        <div className="modal-actions">
          <Button
            onClick={() => {
              onCloseSuccess();
              resetCart();
            }}
          >
            Okay
          </Button>
        </div>
      </div>
    </Modal>
  );
}
