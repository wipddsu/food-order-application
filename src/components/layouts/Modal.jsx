import { createPortal } from 'react-dom';

export default function Modal({ children }) {
  return createPortal(<dialog className="modal">{children}</dialog>, document.getElementById('modal'));
}
