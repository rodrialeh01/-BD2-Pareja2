import bcrypt from 'bcrypt';


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