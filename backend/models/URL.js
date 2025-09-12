import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const URL = sequelize.define("URL", {
  originalUrl: { type: DataTypes.STRING, allowNull: false },
  shortCode: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// ensure DB is synced
await sequelize.sync();

export default URL;
