export const obtenerFechaHoraActual = () => {
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const anio = fechaActual.getFullYear();
    const hora = String(fechaActual.getHours()).padStart(2, '0');
    const minuto = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundo = String(fechaActual.getSeconds()).padStart(2, '0');

    const fechaHoraFormateada = `${dia}/${mes}/${anio} ${hora}:${minuto}:${segundo}`;
    return fechaHoraFormateada;
}

