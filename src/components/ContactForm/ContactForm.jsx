import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { AddContactForm } from './ContactForm.styled';
import { addContact } from 'redux/operation';
import { selectContacts } from 'redux/selectors';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phone: Yup.string()
    .min(6)
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    )
    .required('Required'),
});
const initialValues = { name: '', phone: '' };

export const ContactForm = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectContacts);

  const handleSubmit = ({ name, phone }, { resetForm }) => {
    if (items.find(value => value.name === name)) {
      toast.error(`${name} is already in the contact list`);
      return;
    }

    dispatch(addContact({ name, phone }));
    toast.success(`${name} added to contact list`);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <AddContactForm autoComplete="off">
        <label>
          Name
          <Field type="text" name="name" placeholder="First and last name" />
        </label>
        <label>
          Number
          <Field type="text" name="phone" placeholder="0123467890" />
        </label>
        <button type="submit">Add contact</button>
      </AddContactForm>
    </Formik>
  );
};
