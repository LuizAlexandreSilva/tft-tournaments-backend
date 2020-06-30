import { Router } from 'express';
import OrganizerTournamentsController from '@modules/tournaments/infra/http/controller/OrganizerTournamentsController';

const ownerTournamentsRouter = Router();
const organizerTournamentsController = new OrganizerTournamentsController();

ownerTournamentsRouter.get('/:ownerId', organizerTournamentsController.get);

export default ownerTournamentsRouter;
