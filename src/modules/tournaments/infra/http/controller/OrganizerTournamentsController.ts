import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListOrganizerTournamentsService from '@modules/tournaments/services/ListOrganizerTournamentsService';
import { classToClass } from 'class-transformer';

export default class OrganizerTournamentsController {
  public async get(request: Request, response: Response): Promise<Response> {
    const { ownerId } = request.params;

    const listOrganizerTournaments = container.resolve(
      ListOrganizerTournamentsService,
    );

    const tournaments = await listOrganizerTournaments.execute(Number(ownerId));

    return response.json(classToClass(tournaments));
  }
}
