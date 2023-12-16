import { db_root } from './db.js';

//prueba de conexion
try {
  const connection1 = await db_root.getConnection();
  const [rows1, fields1] = await connection1.execute('SELECT * FROM USER');
  console.log(rows1);
}catch(err){
  console.log(err);
}