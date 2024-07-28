import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { CartEntity } from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-item.entity';
import { DataSource } from 'typeorm';

dotenv.config();
console.log(process.env.DB_HOST);
console.log(parseInt(process.env.DB_PORT || '5432'));
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
console.log(process.env.DB_NAME);
@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [CartEntity, CartItemEntity],
      synchronize: false,
      logging: true,
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([CartItemEntity, CartEntity]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
