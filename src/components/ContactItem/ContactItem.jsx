import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { deleteContact } from 'redux/operation';

export const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <p>
      <span>{name}:</span>
      <span>{number}</span>
      <button
        type="button"
        onClick={() => {
          dispatch(deleteContact(id));
          toast.success(`The contact ${name} has been deleted`);
        }}
      >
        Remove
      </button>
    </p>
  );
};
