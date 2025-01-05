import { Router } from 'express';

import * as contactsController from '../controllers/contacts-controllers.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const contactsRouter = Router();
// usi kontakti otrimuemo:

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));

// zapit odnogo kontaktu:

contactsRouter.get('/:id', ctrlWrapper(contactsController.getContactsByIdController));

contactsRouter.post("/", ctrlWrapper(contactsController.addContactsController));

// upsert=update+insert

contactsRouter.put('/:id', ctrlWrapper(contactsController.upsertContactController));

contactsRouter.patch("/:id", ctrlWrapper(contactsController.patchContactController));

contactsRouter.delete("/:id", ctrlWrapper(contactsController.deleteContactController));

export default contactsRouter;
