const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table `people` created or already exists');

    // Verificar as tabelas existentes
    connection.query('SHOW TABLES', (err, results) => {
      if (err) {
        console.error('Error fetching tables:', err);
        return;
      }
      console.log('Tables:', results);
    });
  });
});

app.get('/', (req, res) => {
  const sqlInsert = `INSERT INTO people(name) VALUES('Guilherme');`;
  connection.query(sqlInsert, (err) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send(`Error inserting data: ${err.message}`);
    }

    connection.query('SELECT name FROM people', (err, results) => {
      if (err) {
        return res.status(500).send('Error retrieving data');
      }

      let names = '<ul>';
      results.forEach((row) => {
        names += `<li>${row.name}</li>`;
      });
      names += '</ul>';

      res.send(`<h1>Full Cycle Rocks!</h1>${names}`);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
