import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
      newPassword: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('newPassword')),
    },
  }),
  profileController.update,
);

export default profileRouter;
