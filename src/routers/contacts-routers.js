import { Router } from 'express';
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from '../validation/contacts.js';
import { validationBody } from '../middelwares/validationBody.js';
import {isValidId} from '../middelwares/isValidId.js';

import * as contactsController from '../controllers/contacts-controllers.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const contactsRouter = Router();
// usi kontakti otrimuemo:

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));

// zapit odnogo kontaktu:

contactsRouter.get(
  '/:id', isValidId,
  ctrlWrapper(contactsController.getContactsByIdController),
);

contactsRouter.post(
  '/',
  validationBody(contactsAddSchema),
  ctrlWrapper(contactsController.addContactsController),
);

// upsert=update+insert

contactsRouter.put(
  '/:id', isValidId,
  validationBody(contactsAddSchema),
  ctrlWrapper(contactsController.upsertContactController),
);

contactsRouter.patch(
  '/:id', isValidId,
  validationBody(contactsUpdateSchema),
  ctrlWrapper(contactsController.patchContactController),
);

contactsRouter.delete(
  '/:id', isValidId,
  ctrlWrapper(contactsController.deleteContactController),
);

export default contactsRouter;
