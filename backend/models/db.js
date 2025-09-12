import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "url_shortener",
  process.env.DB_USER || "user",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
    retry: { max: 10 }, // retry up to 10 times
  }
);

export default sequelize;
