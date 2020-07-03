import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tournament_brackets')
export default class TournamentBracket {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'tournament_id' })
  tournamentId: number;

  @Column({ name: 'player_nickname' })
  playerNickname: string;

  @Column('integer', { name: 'num_phase' })
  numPhase: number;

  @Column('integer', { name: 'bracket_number' })
  bracketNumber: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
