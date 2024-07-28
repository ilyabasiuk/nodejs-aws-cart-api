import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { CartItemEntity } from './cart-item.entity';

@Entity({ name: 'carts' })
export class CartEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column({ enum: ['OPEN', 'ORDERED'] })
  status: string;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
  items: CartItemEntity[];
}
