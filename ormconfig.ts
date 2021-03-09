export default {
  type: "mysql",
  host: "localhost",
  port: process.env.MYSQL_PORT,
  username: "root",
  password: "123qwe",
  database: "dubbing",
  synchronize: false,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
  },
};
