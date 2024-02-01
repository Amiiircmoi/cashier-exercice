import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product_category.entity';
import { Invoice } from './entities/invoice.entity';
import { InvoiceProduct } from './entities/invoice_product.entity';
import { Plan } from './entities/plan.entity';
import { Table } from './entities/table.entity';


@Module({
  imports: [
    DataModule,
    TypeOrmModule.forFeature([Product, ProductCategory, Invoice, InvoiceProduct, Plan, Table])
  ],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule { }
