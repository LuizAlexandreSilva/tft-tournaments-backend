import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import tournamentsRouter from '@modules/tournaments/infra/http/routes/tournaments.routes';
import ownerTournamentsRouter from '@modules/tournaments/infra/http/routes/ownerTournaments.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/tournaments', tournamentsRouter);
routes.use('/owner-tournaments', ownerTournamentsRouter);

export default routes;
