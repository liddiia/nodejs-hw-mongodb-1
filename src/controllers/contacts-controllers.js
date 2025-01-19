import createError from 'http-errors';

import * as contactServices from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

import { sortByList } from '../db/models/contacts.js';

import { parseContactFilterParams } from '../utils/parseContactFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactFilterParams(req.query);
  filter.userId = req.user._id;
  // console.log(filter);
  const data = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;

  const data = await contactServices.getContact({ _id, userId });

  if (!data) {
    throw createError(404, `Contact with id = ${_id} not found`);
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id=${_id}`,
    data,
  });
};
export const addContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await contactServices.addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully add contact',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await contactServices.updateContact(
    id,
    { ...req.body, userId },
    {
      upsert: true,
    },
  );
  const status = isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully update contact',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const result = await contactServices.updateContact({ _id, userId }, req.body);

  if (!result) {
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully upsert movie',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.deleteContact({ _id, userId });

  if (!data) {
    throw createError(404, `Movie with id=${_id} not found`);
  }

  res.status(204).send();
};
