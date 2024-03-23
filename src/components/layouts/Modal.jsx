import { forwardRef } from 'react';
import { createPortal } from 'react-dom';

export default forwardRef(function Modal({ children }, ref) {
  return createPortal(
    <dialog className="modal" ref={ref}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
});
