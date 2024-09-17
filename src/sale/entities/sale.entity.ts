import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'sale' })
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: number;

  @Column()
  price: number;

  @Column()
  user_id: number;

  @Column()
  total_amount: number;

  @Column()
  customer_id?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @ManyToMany(() => Product)
  // @JoinColumn({ name: 'product_id' })
  // product: Product[];
}
