import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    password: "amircmoi",
    username: "amir",
    database: "cashier-exercice",
    port: 3306,
    synchronize: false,
    dropSchema: false,
    migrationsTableName: "migration_versions",
    migrations: ["migrations/*.ts"],
    entities: [
        "src/entities/**/*.ts"
    ],
})