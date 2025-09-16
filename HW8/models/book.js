import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

  const Book = sequelize.define('App', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'Books',
    timestamps: false,
  });

export default Book;