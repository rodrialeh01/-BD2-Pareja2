import bcrypt from 'bcrypt';
import { parse } from 'date-fns';

export const cifrarPassword = async (password) => {
    const salt = await bcrypt.genSalt(4);
    return await bcrypt.hash(password, salt);
}

export const compararPassword = async (password, passwordCifrado) => {
    try {
        return await bcrypt.compare(password, passwordCifrado);

    } catch (error) {
        console.log(error);
        res.status(500).json( { status: false } );
    }
}

export const compararPorTiempo = (a, b) => {
    const tiempoA = parse(a.tiempo, 'dd/MM/yyyy HH:mm:ss', new Date());
    const tiempoB = parse(b.tiempo, 'dd/MM/yyyy HH:mm:ss', new Date());

    if (tiempoA.getTime() === tiempoB.getTime()) {
        // Si los tiempos son iguales, compara por ID para tener un orden determinístico
        return a.id.localeCompare(b.id);
    }

    // Orden descendente por tiempo
    return tiempoB.getTime() - tiempoA.getTime();
}