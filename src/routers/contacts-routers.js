import { Router } from 'express';
import { isValidId } from '../middelwares/isValidId.js';
import { authenticate } from '../middelwares/authenticate.js';
import * as contactsController from '../controllers/contacts-controllers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../middelwares/validationBody.js';

import {
  contactsAddSchema,
  contactsUpdateSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

// перевіряється для всіх контактів

contactsRouter.use(authenticate);

// usi kontakti otrimuemo:

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));

// zapit odnogo kontaktu:

contactsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactsController.getContactsByIdController),
);

contactsRouter.post(
  '/',
  validationBody(contactsAddSchema),
  ctrlWrapper(contactsController.addContactsController),
);

// upsert=update+insert

contactsRouter.put(
  '/:id',
  isValidId,
  validationBody(contactsAddSchema),
  ctrlWrapper(contactsController.upsertContactController),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  validationBody(contactsUpdateSchema),
  ctrlWrapper(contactsController.patchContactController),
);

contactsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactsController.deleteContactController),
);

export default contactsRouter;
