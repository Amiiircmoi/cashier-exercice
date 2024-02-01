import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HandlebarMiddleware } from './middlewares/handlebar.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablePanelModule } from './tablePanel/tablePanel.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PlanModule } from './plan/plan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Table } from './entities/table.entity';
import { Invoice } from './entities/invoice.entity';
import { ProductCategory } from './entities/product_category.entity';
import { InvoiceProduct } from './entities/invoice_product.entity';
import { Plan } from './entities/plan.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'amir',
      password: 'amircmoi',
      database: 'cashier-exercice',
      entities: [Product, Table, Plan, Invoice, ProductCategory, InvoiceProduct],
      synchronize: true,
    }),
    TablePanelModule,
    PlanModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HandlebarMiddleware).forRoutes('/');
    consumer.apply(HandlebarMiddleware).forRoutes('plan');
    consumer.apply(HandlebarMiddleware).forRoutes('invoices');
    consumer.apply(HandlebarMiddleware).forRoutes('tables');
    consumer.apply(HandlebarMiddleware).forRoutes('tables(/.*)');
    consumer.apply(HandlebarMiddleware).forRoutes('invoices(/.*)');
  }
}
