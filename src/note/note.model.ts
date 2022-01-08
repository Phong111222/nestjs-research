import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('note')
export class Note {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    default: '',
  })
  content: string;
}
