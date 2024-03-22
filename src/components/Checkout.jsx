import Modal from './layouts/Modal';

export default function Checkout() {
  return (
    <Modal>
      <div>
        <h2>Checkout</h2>
        <p>Total Amount: $72</p>
        <div className="control">
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" name="fullname" />
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
            <label htmlFor="postalcode">Postal Code</label>
            <input type="postalcode" id="postalcode" name="postalcode" />
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" />
          </div>
        </div>
        <div className="modal-actions">
          <button className="text-button">close</button>
          <button className="button">Submit Order</button>
        </div>
      </div>
    </Modal>
  );
}
