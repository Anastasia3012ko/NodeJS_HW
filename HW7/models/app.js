import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

  const App = sequelize.define('App', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'Apps',
    timestamps: false,
  });

export default App;