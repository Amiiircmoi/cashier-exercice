import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]

    constructor(label = '') {
        this.label = label;
    }
}
