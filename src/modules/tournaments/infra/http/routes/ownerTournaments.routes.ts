import { Router } from 'express';
import OrganizerTournamentsController from '@modules/tournaments/infra/http/controller/OrganizerTournamentsController';
import TournamentBracketsController from '@modules/tournaments/infra/http/controller/TournamentBracketsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const ownerTournamentsRouter = Router();
const organizerTournamentsController = new OrganizerTournamentsController();
const tournamentBracketsController = new TournamentBracketsController();

ownerTournamentsRouter.use(ensureAuthenticated);

ownerTournamentsRouter.get('/:ownerId', organizerTournamentsController.get);
ownerTournamentsRouter.post(
  '/:tournamentId/numPhase/:numPhase/players',
  tournamentBracketsController.create,
);
ownerTournamentsRouter.put(
  '/:tournamentId/numPhase/:phaseNumber/brackets',
  tournamentBracketsController.update,
);

export default ownerTournamentsRouter;
