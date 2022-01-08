import { UserRoles } from 'src/role/roles.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
  })
  firstname: string;

  @Column({
    length: 30,
  })
  lastname: string;

  @Column({
    length: 1000,
  })
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    default: true,
  })
  @Column({
    type: 'enum',
    default: UserRoles.USER,
    enum: UserRoles,
  })
  role: string;

  isActive: boolean;
}
