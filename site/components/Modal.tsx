import Icon from '@/components/Icon';
import { useCallback, useEffect, useState } from 'react';

export function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEscape = useCallback(e => {
    if (e.keyCode === 27) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape, false);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  });

  const hideModal = e => {
    setIsOpen(false);
  };

  return isOpen ? (
    <div className="modal-backdrop" tabIndex={-1} role="dialog" onClick={hideModal} onKeyDown={hideModal}>
      <div className="modal">
        <a href="#" className="modal-close" data-dismiss="modal" aria-label="Close modal" onClick={hideModal}>
          <Icon name="x" />
        </a>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  ) : null;
}

export default Modal;
