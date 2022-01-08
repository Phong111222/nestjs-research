import { ProductsService } from './product.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Render,
  Res,
} from '@nestjs/common';
import { Product } from './product.model';
import { JwtGuard } from 'src/auth/jwt-auth.guard';

import { Roles, UserRoles } from 'src/role/roles.decorator';

import { RolesGuard } from 'src/role/roles.guard';
import { Response } from 'express';

@Controller('products')
export class ProductSController {
  constructor(private readonly producService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
    @Body('note') note: string,
    @Body('brand') brand: string,
    @Body('categories') categories: string[],
  ): Promise<Product> {
    return this.producService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice,
      note,
      brand,
      categories,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @Get()
  getListProduct() {
    return this.producService.getListProduct();
  }

  @Get(':id')
  getProductById(@Param('id') prodId: number) {
    return this.producService.getProductById(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: number | string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    return this.producService.updateProduct(
      prodId,
      prodTitle,
      prodDescription,
      prodPrice,
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    return this.producService.deleteProduct(prodId);
  }

  @Get('page/products')
  @Render('product/products')
  async getProductsPage() {
    const products = await this.producService.getListProduct();
    return {
      products,
    };
  }

  @Get('page/products/:id')
  async getProductByIdForPage(
    @Param('id') prodId: number,
    @Res() response: Response,
  ) {
    const product = await this.producService.getProductById(prodId);
    return response.render('product/product', { product });
  }
}
