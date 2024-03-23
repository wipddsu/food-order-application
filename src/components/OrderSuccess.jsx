export default function OrderSuccess({ onCloseSuccess }) {
  return (
    <div>
      <h2>Success!</h2>
      <p>Your order was submitted successfully</p>
      <p>We will get back to you with more detail via email within the next few minutes</p>
      <div className="modal-actions">
        <button className="button" onClick={onCloseSuccess}>
          Okay
        </button>
      </div>
    </div>
  );
}