import { DataSource } from "typeorm";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "root",
//   database: "poolboard",
//   entities: ["src/entities/*.{js,ts}"],
//   migrations: ["src/database/migrations/*.ts"],
//   logging: false,
//   synchronize: true,
// });

export const AppDataSource = new DataSource({
  type: "postgres",
  // host: "ec2-34-231-63-30.compute-1.amazonaws.com",
  // port: 5432,
  // username: "ueyafgxlxzldeh",
  // password: "76ae13ca1840914ab869e18438fd0280750cd6566cc0e8f73dc588f84e016626",
  // database: "ddfqh165llskfc",
  url: "postgres://ueyafgxlxzldeh:76ae13ca1840914ab869e18438fd0280750cd6566cc0e8f73dc588f84e016626@ec2-34-231-63-30.compute-1.amazonaws.com:5432/ddfqh165llskfc",
  entities: ["src/entities/*.{js,ts}"],
  migrations: ["src/database/migrations/*.{js,ts}"],
  logging: false,
  synchronize: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
