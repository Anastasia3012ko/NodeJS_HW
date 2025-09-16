import db from "./db.js";

const createTable = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
  );
`;

db.query(createTable, (err) => {
  if (err) {
    console.error('Error creating table: ', err);
  } else {
    console.log('Table "products" has been created or already exists');
  }
});