'use client';
import Icon from '@/components/Icon';
import { ModalContext } from '@/contexts/ModalContext';
import { useContext } from 'react';

const Modal = ({ content }) => {
  let { showModal, handleModal } = useContext(ModalContext);
  // const modalRoot = document.getElementById('#modal-root');
  return showModal ? (
        <div className="modal-backdrop" tabIndex={-1} role="dialog" onClick={handleModal} onKeyDown={handleModal}>
          <div className="modal">
            <a href="#" className="modal-close" data-dismiss="modal" aria-label="Close modal" onClick={handleModal}>
              <Icon name="x" />
            </a>
            <div className="modal-body">{content}</div>
          </div>
        </div>
      )
    : <></>;
};

export default Modal;
