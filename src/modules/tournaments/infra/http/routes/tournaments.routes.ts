import { Router } from 'express';
import TournamentsController from '@modules/tournaments/infra/http/controller/TournamentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const tournamentsRouter = Router();
const tournamentsController = new TournamentsController();

tournamentsRouter.get('/:id', tournamentsController.index);

tournamentsRouter.use(ensureAuthenticated);
tournamentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
      ownerId: Joi.number().required(),
    },
  }),
  tournamentsController.create,
);

export default tournamentsRouter;
