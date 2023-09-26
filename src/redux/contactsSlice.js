import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operation';

const loadingContacts = state => {
  state.isLoading = true;
};
const fetchingFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
};
const fetchingError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const fechingAddContact = (state, action) => {
  state.isLoading = false;
  state.items = [...state.items, action.payload];
};
const removeContact = (state, action) => {
  state.isLoading = false;
  state.items = state.items.filter(contact => contact.id !== action.payload.id);
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, loadingContacts)
      .addCase(fetchContacts.fulfilled, fetchingFulfilled)
      .addCase(fetchContacts.rejected, fetchingError)
      .addCase(addContact.pending, loadingContacts)
      .addCase(addContact.fulfilled, fechingAddContact)
      .addCase(addContact.rejected, fetchingError)
      .addCase(deleteContact.pending, loadingContacts)
      .addCase(deleteContact.fulfilled, removeContact)
      .addCase(deleteContact.rejected, fetchingError);
  },
});

export const contactsReduser = contactsSlice.reducer;
