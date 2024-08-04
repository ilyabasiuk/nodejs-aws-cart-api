import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import {
  LocalAuthGuard,
  AuthService,
  JwtAuthGuard,
  BasicAuthGuard,
} from './auth';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from './entities/cart-item.entity';
import { CartEntity } from './entities/cart.entity';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    @InjectRepository(CartItemEntity)
    private cartItemsRepository: Repository<CartItemEntity>,
    @InjectRepository(CartEntity)
    private cartsRepository: Repository<CartEntity>,
  ) {}

  @Get(['', 'ping'])
  healthCheck(): any {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    const token = this.authService.login(req.user, 'basic');

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        ...token,
      },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        user: req.user,
      },
    };
  }

  // Method for testing connection with DB
  @Get('api/cart-items')
  async getCartItems(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        items: await this.cartItemsRepository.find(),
      },
    };
  }

  @Get('api/carts')
  async getCarts(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        carts: await this.cartsRepository.find({ relations: ['items'] }),
      },
    };
  }
}
