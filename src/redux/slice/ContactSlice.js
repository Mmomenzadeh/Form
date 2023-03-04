import { createSlice } from "@reduxjs/toolkit";

const updateLocalSorage = (ContactList) => {
  localStorage.setItem("contact-List", JSON.stringify(ContactList));
};

const initialState = {
  ContactList: localStorage.hasOwnProperty("contact-List")
    ? JSON.parse(localStorage.getItem("contact-List"))
    : []
};

console.log(initialState);

const ContactSlice = createSlice({
  name: "contactList",
  initialState,
  reducers: {
    createContact: (state, action) => {
      updateLocalSorage([...state.ContactList, action.payload]);
      return {
        ...state,
        ContactList: [...state.ContactList, action.payload],
      };
    },

    deleteContact :(state , action)=>{
      state.ContactList = state.ContactList.filter(item => item.id !== action.payload)
      updateLocalSorage(state.ContactList)
    },

    editeContact: (state, action) => {
      const contactIndex = state.ContactList.findIndex(
        (item) => item.id === action.payload.id
      );
      // const updateContact = [...state.ContactList];

       state.ContactList.splice(contactIndex, 1, {
        name: action.payload.name,
        email: action.payload.email,
        relationship: action.payload.relationship,
        family: action.payload.family,
        phoneNumber: action.payload.phoneNumber,
        id: action.payload.id,
      });
      console.log(state.ContactList);
     updateLocalSorage(state.ContactList)
      
    },
  },
});

export const { createContact ,deleteContact } = ContactSlice.actions;
export default ContactSlice.reducer;
