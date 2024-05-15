import { Sequelize } from "sequelize";
import config from "../config.js";


const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  host: config.dbHost,
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});


export default sequelize;
