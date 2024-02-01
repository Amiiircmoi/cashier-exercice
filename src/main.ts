import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const dirname = __dirname.replace('/dist', '');
  app.useStaticAssets({
    root: join(dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(dirname, '..', 'views'),
    layout: './layouts/main-layout',
    options: {
      partials: {
        header: 'header.hbs',
        footer: 'footer.hbs',
        table: './partials/table.hbs',
        panelOrder: './partials/panel-order.hbs',
        panelProducts: './partials/panel-products.hbs',
        panelProductCard: './partials/panel-product-card.hbs',
      },
    },
  });
  await app.listen(3000);
}
bootstrap();
