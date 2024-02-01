import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./product_category.entity";
import { InvoiceProduct } from "./invoice_product.entity";
import { Invoice } from "./invoice.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  price: number;

  @Column()
  pic: string;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  category: ProductCategory;

  @OneToMany(() => InvoiceProduct, (invoiceProduct) => invoiceProduct)
  invoiceProducts: InvoiceProduct

  constructor(label = '', price = 0, pic = '', category: ProductCategory) {
    this.label = label;
    this.price = price;
    this.pic = pic;
    this.category = category
  }
}
