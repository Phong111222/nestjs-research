import { Brand } from 'src/brand/brand.model';
import { Category } from 'src/category/category.model';
import { Note } from 'src/note/note.model';
import {
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

const { Column, Entity, PrimaryGeneratedColumn } = require('typeorm');

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  title: string;

  @Column({
    default: 1000,
  })
  price: number;

  @Column({
    length: 200,
  })
  description: string;

  @OneToOne(() => Note, {
    cascade: ['insert', 'remove', 'update'],
  })
  @JoinColumn()
  note: Note;

  @ManyToOne(() => Brand, (brand) => brand.products, {
    cascade: ['insert', 'update', 'remove'],
  })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable({
    name: 'products_categories',
  })
  categories: Category[];
}
