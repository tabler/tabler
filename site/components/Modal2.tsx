'use client';
import Icon from '@/components/Icon';
import { ModalContext } from '@/contexts/ModalContext';
import { useContext } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ content }) => {
  let { showModal, handleModal } = useContext(ModalContext);
  const modalRoot = document.querySelector('#modal-root');
  return showModal && modalRoot
    ? ReactDOM.createPortal(
        <div className="modal-backdrop" tabIndex={-1} role="dialog" onClick={handleModal} onKeyDown={handleModal}>
          <div className="modal">
            <a href="#" className="modal-close" data-dismiss="modal" aria-label="Close modal" onClick={handleModal}>
              <Icon name="x" />
            </a>
            <div className="modal-body">{content}</div>
          </div>
        </div>,
        modalRoot,
      )
    : null;
};

export default Modal;
