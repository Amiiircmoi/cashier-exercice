import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Table } from "./table.entity";
import { Invoice } from "./invoice.entity";
import { Product } from "./product.entity";

@Entity()
export class InvoiceProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Invoice, (invoice) => invoice.invoiceProducts)
    invoice: Invoice

    @ManyToOne(() => Product, (product) => product.invoiceProducts)
    product: Product

    @Column()
    quantity: number
}
