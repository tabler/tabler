import { useState } from 'react';

const useModal = () => {
  let [showModal, setShowModal] = useState(false);

  let handleModal = () => {
    setShowModal(!showModal);
  };

  return { showModal, handleModal };
};

export default useModal;
