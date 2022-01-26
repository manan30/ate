import Modal from '../Modal';

const UserLocationModal = ({
  confirmActionHandler
}: {
  confirmActionHandler: () => void;
}) => {
  return (
    <Modal
      size='small'
      confirmAction={{ text: 'Okay', handler: confirmActionHandler }}
    >
      <div className='text-sm text-slate-700 lg:text-base'>
        Please share your location to get the most accurate results
      </div>
    </Modal>
  );
};

export default UserLocationModal;
