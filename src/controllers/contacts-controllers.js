import createError from 'http-errors';

import * as contactServices from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const data = await contactServices.getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await contactServices.getContactsById(id);

  if (!data) {
    throw createError(404, `Contact with id = ${id} not found`);
    // const error = new Error(`Contact with id = ${id} not found`);
    // error.status = 404;
    // throw error;
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id=${id}`,
    data,
  });
};
export const addContactsController = async (req, res) => {
  const data = await contactServices.addContact(req.body);
  res.status(201).json({
    status: 201,
    message: "Successfully add contact",
    data
  });
};

export const upsertContactController = async (req, res) => {
  const {id} = req.params;
  const {isNew, data} = await contactServices.updateContact(id, req.body,{upsert: true});
  const status = isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: "Successfully update contact",
    data,
  });
};

export const patchContactController = async(req, res)=> {
  const {id} = req.params;
  const result = await contactServices.updateContact(id, req.body);

  if(!result) {
      throw createError(404, `Contact with id=${id} not found`);
  }

  res.json({
      status: 200,
      message: "Successfully upsert movie",
      data: result.data,
  });
};

export const deleteContactController = async(req, res)=> {
  const {id} = req.params;
  const data = await contactServices.deleteContact({_id: id});

  if(!data) {
      throw createError(404, `Movie with id=${id} not found`);
  }

  res.status(204).send();
};
