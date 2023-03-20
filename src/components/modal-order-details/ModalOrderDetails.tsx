import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, OrderDetails } from '../';

interface IProps {
  onClose: () => void;
}

const ModalOrderDetails: FC<IProps> = ({ onClose }) => {
  const { id } = useParams();

  return (
    <Modal title={`#${id}`} onClose={onClose}>
      <OrderDetails />
    </Modal>
  );


};

export default React.memo(ModalOrderDetails);