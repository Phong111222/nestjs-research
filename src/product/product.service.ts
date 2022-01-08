import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/brand/brand.model';
import { Category } from 'src/category/category.model';
import { Note } from 'src/note/note.model';
import { Repository } from 'typeorm';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Note) private noteRepository: Repository<Note>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
    note: string,
    brand: string,
    categories: string[],
  ): Promise<Product> {
    const newProduct = new Product();
    newProduct.price = price;
    newProduct.title = title;
    newProduct.description = description;

    newProduct.note = this.noteRepository.create({ content: note });

    const existedBrand = await this.brandRepository.findOne({ name: brand });

    if (!existedBrand) {
      newProduct.brand = this.brandRepository.create({ name: brand });
    } else {
      newProduct.brand = existedBrand;
    }

    let categoryArr: Category[] = [];
    for (let category of categories) {
      const existedCategory = await this.categoryRepository.findOne({
        name: category,
      });
      if (!existedCategory) {
        categoryArr.push(this.categoryRepository.create({ name: category }));
      } else {
        categoryArr.push(existedCategory);
      }
    }
    newProduct.categories = categoryArr;
    return this.productRepository.save(newProduct);
  }

  async getListProduct(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  getProductById(id: number | string): Promise<Product> {
    return this.productRepository.findOne(id, {
      select: ['description', 'title', 'price', 'id'],
      relations: ['note', 'brand', 'categories'],
    });
  }

  async updateProduct(
    id: number | string,
    title: string,
    description: string,
    price: number,
  ): Promise<{ message: string }> {
    try {
      const product = await this.getProductById(id);

      if (!product) {
        throw new NotFoundException('Product not found');
      }
      if (title) {
        product.title = title;
      }
      if (description) {
        product.description = description;
      }
      if (price) {
        product.price = price;
      }
      this.productRepository.save(product);
      return {
        message: 'Update success',
      };
    } catch (error) {
      return {
        message: error.response.message,
      };
    }
  }

  async deleteProduct(id: number | string): Promise<{ message: string }> {
    try {
      const product = await this.getProductById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      this.productRepository.delete(product);
      return {
        message: 'Delete successful',
      };
    } catch (error) {
      return {
        message: error.response.message,
      };
    }
  }
}
