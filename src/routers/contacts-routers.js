import { Router } from 'express';
import { isValidId } from '../middelwares/isValidId.js';
import { authenticate } from '../middelwares/authenticate.js';
import * as contactsController from '../controllers/contacts-controllers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../middelwares/validationBody.js';
import { upload } from '../middelwares/multer.js';
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));

contactsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactsController.getContactsByIdController),
);
// upload.single("photo") одне фото в полі "photo"
// upload.array("photo",8) до 8 файлів в полі "photo"
// upload.filds ([{name:"photo",maxCount:1},{name:"subphoto",maxCount:4}])
// upload до validationBody!
contactsRouter.post(
  '/',
  upload.single('photo'),
  validationBody(contactsAddSchema),
  ctrlWrapper(contactsController.addContactsController),
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
