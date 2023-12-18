import { EliminarRegistro } from './crudbd/eliminar.js';
import { Login } from './pantalla_inicial/login.js';
import { MenuPrincipal } from './pantalla_inicial/menuPrincipal.js';

//prueba de conexion
// try {
//   const connection1 = await db_root.getConnection();
//   const [rows1, fields1] = await connection1.execute('SELECT * FROM USER');
//   console.log(rows1);
// }catch(err){
//   console.log(err);
// }

//Registro();
// MenuHospital({usuario: 'admin'})
// ActualizarRegistro({usuario: 'admin'});
// AgregarRegistro({usuario: 'admin'});
// ConsultarRegistro({usuario: 'admin'});
//EliminarRegistro({usuario: 'admin'});

MenuPrincipal();
