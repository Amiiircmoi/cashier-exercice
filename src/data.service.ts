import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Invoice } from './entities/invoice.entity';
import { Table, TypeTable } from './entities/table.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { InvoiceProduct } from './entities/invoice_product.entity';
import { ProductCategory } from './entities/product_category.entity';

const PATH_IMAGE = '/public/img/food/';

@Injectable()
export class DataService {
  // TO DELETE
  // private products = [];
  private invoices = [];
  // private tables = [];

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceProduct)
    private invoiceProductRepository: Repository<InvoiceProduct>,
    @InjectRepository(Table)
    private tablesRepository: Repository<Table>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {
    this.seedProducts();
    this.seedTables();
  }

  /** Public methdods */

  async findAllProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOneProduct(id: number): Promise<Product | null> {
    return this.productsRepository.findOneBy({ 'id': id });
  }

  async findProductsByCategory(idCategory: number): Promise<Product[]> {
    return this.productsRepository.findBy({ 'category': idCategory });
  }

  async findAllTables(): Promise<Table[]> {
    return this.tablesRepository.find();
  }

  findOneTable(id: number): Promise<Table | null> {
    return this.tablesRepository.findOneBy({ 'id': id });
  }

  findOneTableByPosition(x: number, y: number): Promise<Table | null> {
    return this.tablesRepository.findOneBy({ 'posX': x, 'posY': y });
  }

  async findAllInvoices(): Promise<Invoice[]> {
    return this.invoices;
  }

  async findAllClosedInvoices(): Promise<Invoice[]> {
    return this.invoices?.filter((invoice) => {
      return invoice.date_end != null;
    });
  }

  findOneInvoice(id: number): Promise<Invoice | null> {
    return this.invoices?.find((invoice) => {
      return invoice.id == id;
    });
  }

  async saveInvoice(invoice: Invoice): Promise<Invoice> {
    if (!this.findOneInvoice(invoice.id)) {
      this.invoices.push(invoice);
    }
    return invoice;
  }

  async removeInvoice(id: number): Promise<void> {
    const index = this.invoices.indexOf((invoice) => invoice.id == id);
    if (index !== -1) {
      this.invoices.splice(index, 1);
    }
    return new Promise(resolve => resolve());
  }

  async seedProducts(): Promise<void> {
    // seed products table
    console.log('** Seed products table **');
    // this.products = this.loadDefaultProducts();

    const defaultProducts = this.loadDefaultProducts();
    for (const product of defaultProducts) {
      await this.productsRepository.save(product);
    }

    console.log('** End Seed products table **');
  }

  async seedTables(): Promise<void> {
    // seed products table
    console.log('** Seed tables table **');
    // this.tables = this.loadDefaultTables();

    const defaultTables = this.loadDefaultTables();
    for (const table of defaultTables) {
      await this.tablesRepository.save(table);
    }

    console.log('** End Seed tables table **');
  }

  /** Private methods */
  private loadDefaultTables(): Table[] {
    return [
      new Table(1, TypeTable.rectangle_8, 0, 0),
      new Table(2, TypeTable.square_2, 0, 1),
      new Table(3, TypeTable.square_4, 1, 0),
      new Table(4, TypeTable.square_4, 1, 1),
      new Table(5, TypeTable.round_4, 1, 2),
    ];
  }

  private loadDefaultProducts(): Product[] {
    const entries = new ProductCategory('Entries');
    this.productCategoryRepository.save(entries);
    const dishes = new ProductCategory('Dishes');
    this.productCategoryRepository.save(dishes);
    const deserts = new ProductCategory('Deserts');
    this.productCategoryRepository.save(deserts);
    const drinks = new ProductCategory('Drinks');
    this.productCategoryRepository.save(drinks);
    const alcools = new ProductCategory('Alcools');
    this.productCategoryRepository.save(alcools);

    return [
      // starters
      new Product(
        'Duo de saumon pickles, billes de combava, condiment avocat',
        20.0,
        `${PATH_IMAGE}starter1.jpg`,
        entries,
      ),
      new Product(
        'Langoustine en cocktail, chimichurri',
        24.0,
        `${PATH_IMAGE}starter2.jpg`,
        entries,
      ),
      new Product(
        'Carpaccio de tomates, moutarde balsamique, légumes confits en pickles',
        14.0,
        `${PATH_IMAGE}starter3.jpg`,
        entries,
      ),
      new Product(
        'Bruschetta au maroilles, pickles d’oignon, mesclun acidulé',
        15.0,
        `${PATH_IMAGE}starter4.jpg`,
        entries,
      ),
      new Product(
        'Salade César Panko',
        22.0,
        `${PATH_IMAGE}starter5.jpg`,
        entries,
      ),
      new Product(
        'Tartine de chèvre rôti, légumes confits, mesclun',
        20.0,
        `${PATH_IMAGE}starter6.jpg`,
        entries,
      ),
      new Product(
        'Tartare de boeuf au couteau, frites, salade',
        24.0,
        `${PATH_IMAGE}starter7.jpg`,
        entries,
      ),

      // main dishes
      new Product(
        'Burger Gantois',
        23.0,
        `${PATH_IMAGE}dishe1.jpg`,
        dishes,
      ),
      new Product(
        'Volaille en croûte de céréales, sauce maroilles, crémeux de carottes, légumes rôtis',
        21.0,
        `${PATH_IMAGE}dishe2.jpg`,
        dishes,
      ),
      new Product(
        'Waterzoï de cabillaud, tagliatelles de légumes sautés, émulsion pomme et citron',
        24.0,
        `${PATH_IMAGE}dishe3.jpg`,
        dishes,
      ),
      new Product(
        'Risotto de gambas à l’ail, légumes de saison sautés',
        29.0,
        `${PATH_IMAGE}dishe4.jpg`,
        dishes,
      ),
      new Product(
        'Filet de bœuf Simmental rôti, mousseline de céleri vanille, légumes glacés, jus corsé	',
        29.0,
        `${PATH_IMAGE}dishe5.jpg`,
        dishes,
      ),
      new Product(
        'Potjevleesch, frites et salade',
        21.0,
        `${PATH_IMAGE}dishe6.jpg`,
        dishes,
      ),
      new Product(
        'Cromesquis de Crevettes, frites et salade	',
        20.0,
        `${PATH_IMAGE}dishe7.jpg`,
        dishes,
      ),
      new Product(
        'Welsh jambon, frites	',
        22.0,
        `${PATH_IMAGE}dishe8.jpg`,
        dishes,
      ),
      new Product(
        'Welsh saumon fumé, frites',
        25.0,
        `${PATH_IMAGE}dishe9.jpg`,
        dishes,
      ),
      new Product(
        'Carbonnade Flamande, frites',
        20.0,
        `${PATH_IMAGE}dishe10.jpg`,
        dishes,
      ),
      new Product(
        'Croque-Monsieur, frites et salade',
        20.0,
        `${PATH_IMAGE}dishe11.jpg`,
        dishes,
      ),

      // deserts
      new Product(
        'Tarte citron basilic meringuée',
        10.0,
        `${PATH_IMAGE}desert1.jpg`,
        deserts,
      ),
      new Product(
        'Chocolat by Hermitage	',
        10.0,
        `${PATH_IMAGE}desert2.jpg`,
        deserts,
      ),
      new Product(
        'Millefeuille vanille, fraises, éclats de pistaches',
        10.0,
        `${PATH_IMAGE}desert3.jpg`,
        deserts,
      ),
      new Product(
        'Café gourmand',
        10.5,
        `${PATH_IMAGE}desert4.jpg`,
        deserts,
      ),
      new Product(
        'Salade de fruits de saison',
        8.0,
        `${PATH_IMAGE}desert5.jpg`,
        deserts,
      ),
      new Product(
        'Pavé Flamand',
        8.0,
        `${PATH_IMAGE}desert6.jpg`,
        deserts,
      ),

      // drinks
      new Product('Coca Cola', 4.5, `${PATH_IMAGE}drink1.jpg`, drinks),
      new Product('Coca Zéro', 4.5, `${PATH_IMAGE}drink2.jpg`, drinks),
      new Product('Vittel', 5.8, `${PATH_IMAGE}drink3.jpg`, drinks),
      new Product(
        'San Pelegrino',
        5.8,
        `${PATH_IMAGE}drink4.jpg`,
        drinks,
      ),
      new Product('Orangina', 4.5, `${PATH_IMAGE}drink5.jpg`, drinks),
      new Product('Perrier', 4.5, `${PATH_IMAGE}drink6.jpg`, drinks),
      new Product('Limonade', 4.5, `${PATH_IMAGE}drink7.jpg`, drinks),
      new Product('Schweppes', 4.5, `${PATH_IMAGE}drink8.jpg`, drinks),
      new Product(
        'Café allongé',
        3.0,
        `${PATH_IMAGE}drink9.jpg`,
        drinks,
      ),
      new Product('Expresso', 3.0, `${PATH_IMAGE}drink10.jpg`, drinks),
      new Product(
        'Capuccino',
        3.0,
        `${PATH_IMAGE}drink11.jpg`,
        drinks,
      ),

      //alcool
      new Product(
        'Paix dieu',
        10.0,
        `${PATH_IMAGE}alcool1.jpg`,
        alcools,
      ),
      new Product('Duvel', 8.0, `${PATH_IMAGE}alcool2.jpg`, alcools),
      new Product('Chouffe', 7.5, `${PATH_IMAGE}alcool3.jpg`, alcools),
      new Product(
        'Tripel Karmeliet',
        7.5,
        `${PATH_IMAGE}alcool4.jpg`,
        alcools,
      ),
      new Product(
        'Rince Cochon',
        7.0,
        `${PATH_IMAGE}alcool5.jpg`,
        alcools,
      ),
      new Product(
        'Grimbergen',
        6.0,
        `${PATH_IMAGE}alcool6.jpg`,
        alcools,
      ),
      new Product('Leffe', 6.0, `${PATH_IMAGE}alcool7.jpg`, alcools),
      new Product('Cornet', 8.0, `${PATH_IMAGE}alcool8.jpg`, alcools),
      new Product('Corbeau', 8.0, `${PATH_IMAGE}alcool9.jpg`, alcools),
    ];
  }
}
