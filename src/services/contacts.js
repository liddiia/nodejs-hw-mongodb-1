import ContactCollection from "../db/models/contacts.js";


export const getContacts = () =>ContactCollection.find();
export const getContactsById = id =>ContactCollection.findById(id);
