import ContactCollection from '../db/models/contacts.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  // oб'єкт запиту, що знаходить усі-- ContactCollection.find();
  // відповідь запиту - await ContactCollection.find()

  const contactsQuery = ContactCollection.find();
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.userId){
    contactsQuery.where('userId').equals(filter.userId);
  };
  const totalItems = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();
  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData({ page, perPage,totalItems});

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};
export const getContactsById = (id) => ContactCollection.findById(id);

export const getContact = filter => ContactCollection.findOne(filter);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (filter, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactCollection.findOneAndUpdate({filter }, payload, {
    new: true,
    upsert,
    runValidators: true,
    includeResultMetadata: true,
  });
  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
