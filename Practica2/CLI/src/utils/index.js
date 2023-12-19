import {db_root} from '../db.js';

export const color = (r, g, b) => {
    return `\x1b[38;2;${r};${g};${b}m`;
}

export const fechaActual = () => {
    let now = new Date();
    return now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " " +
        ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
}

export const obtenerRolUser = async (usuario) => {
    const connRoot = await db_root.getConnection();
    await connRoot.query(`USE ${process.env.DB_NAME}`);
    let rol = await connRoot.query(`SELECT rol FROM usuario WHERE nombre = '${usuario}'`);
    let rolUser = rol[0][0].rol;

    const roles = ['Administrador', 'Asistente', 'Doctor', 'Soporte'];
    const rolUsuario = roles[rolUser - 1];

    connRoot.release();
    return rolUsuario;
}