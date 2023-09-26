import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operation';

import { ContactItem } from 'components/ContactItem/ContactItem';
import { Item } from './ContactList.styled';
import {
  selectContacts,
  selectFilter,
  selectIsLoading,
  selectError,
} from 'redux/selectors';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const contactsStore = useSelector(selectContacts);
  const filterStore = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const visibleContacts = contactsStore.filter(contact =>
    contact.name.toLowerCase().includes(filterStore.toLowerCase())
  );

  return (
    <>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      {visibleContacts.length > 0 ? (
        <ul>
          {visibleContacts.map(({ id, name, phone }) => {
            return (
              <Item key={id}>
                <ContactItem id={id} name={name} number={phone} />
              </Item>
            );
          })}
        </ul>
      ) : (
        <p>Phone book is empty!</p>
      )}
    </>
  );
};
