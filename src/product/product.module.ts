import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Brand } from 'src/brand/brand.model';
import { Category } from 'src/category/category.model';
import { Note } from 'src/note/note.model';
import { ProductSController } from './product.controller';
import { Product } from './product.model';
import { ProductsService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Note, Brand, Category]),
    AuthModule,
  ],
  controllers: [ProductSController],
  providers: [ProductsService],
})
export class ProductsModule {}
