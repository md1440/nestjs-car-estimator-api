import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number; // longitude

  @Column()
  lat: number; // latitude

  @Column()
  mileage: number;

  // association between reports-user in db
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
