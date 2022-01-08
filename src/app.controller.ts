import { Controller, Get, Header, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('index')
  @Render('index')
  getHello(): { message: string } {
    return {
      message: 'Hello World',
    };
  }
}
