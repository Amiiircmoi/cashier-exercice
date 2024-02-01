import { Product } from './product.entity';
import { Invoice, InvoiceStatus } from './invoice.entity';
import { Plan } from './plan.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CONFIGURABLE_MODULE_ID } from '@nestjs/common/module-utils/constants';
import { InvoiceProduct } from './invoice_product.entity';

export enum TypeTable {
  square_2 = 'square_dining_table_2',
  square_4 = 'square_dining_table_4',
  rectangle_6 = 'rectangle_dining_table_6',
  rectangle_8 = 'rectangle_dining_table_8',
  round_4 = 'round_dining_table_4',
}
export interface PositionSchemaInterface {
  posX: number;
  posY: number;
}

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Plan, (plan) => plan.tables)
  plan: Plan

  @Column()
  type: string;

  @Column()
  posX: number;

  @Column()
  posY: number;

  position: PositionSchemaInterface;

  @OneToMany(() => Invoice, (invoice) => invoice.table)
  invoices: Invoice[];

  invoice: Invoice = null;

  constructor(
    id: number = null,
    type: TypeTable = TypeTable.square_2,
    x = 0,
    y = 0,
  ) {
    this.id = id;
    this.type = type;
    this.posX = x;
    this.posY = y;
  }

  getCurrentInvoice(): Invoice {
    if (this.invoice == null)
      this.invoice = this.invoices?.find((el) => el.status == InvoiceStatus.running);
    return this.invoice;
  }

  public addProductInvoice(product: Product, quantity: number) {
    if (this.invoice == null) this.invoice = new Invoice();
    this.getCurrentInvoice().table = this;
    // we clone the object to prevent any change of the product parameter pass by referencee
    const product_clone = Object.assign(new Product(), product);
    this.getCurrentInvoice()?.addProduct(product_clone, quantity);
  }

  public close() {
    this.invoice = null;
  }
}
