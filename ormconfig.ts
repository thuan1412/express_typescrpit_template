export default {
  type: "postgres",
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: false,
  logging: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
  },
};
