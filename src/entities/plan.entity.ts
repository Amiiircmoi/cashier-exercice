import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Table } from "./table.entity";

@Entity()
export class Plan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @OneToMany(() => Table, (table) => table.plan)
    tables: Table[]

    constructor(label = '') {
        this.label = label;
    }
}
