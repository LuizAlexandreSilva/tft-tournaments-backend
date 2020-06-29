import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('tournaments')
export default class Tournament {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer', { name: 'owner_id' })
  ownerId: number;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User, {
    eager: true,
  })
  owner: User;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('integer')
  status: number;

  @Column('integer', { name: 'num_players' })
  numPlayers: number;

  @Column({ name: 'first_place' })
  firstPlace: string;

  @Column({ name: 'second_place' })
  secondPlace: string;

  @Column({ name: 'third_place' })
  thirdPlace: string;

  @Column({ name: 'fourth_place' })
  fourthPlace: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
