const mysql2 = require('mysql2');

const pool = mysql2.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Going2berlin%',
  database: 'school-management-system',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;