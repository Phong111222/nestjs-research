import { Product } from 'src/product/product.model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable({
    name: 'products_categories',
  })
  products: Product[];
}
