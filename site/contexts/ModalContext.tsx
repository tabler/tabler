'use client';

import Modal from '@/components/Modal2';
import useModal from '@/hooks/use-modal';
import { createContext } from 'react';

export const ModalContext = createContext({ showModal: false, handleModal: () => {} });

export const ModalProvider = ({ children, modalContent }) => {
  const value = useModal();
  return (
    <ModalContext.Provider value={value}>
      <Modal content={modalContent} />
      {children}
    </ModalContext.Provider>
  );
};
