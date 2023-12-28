import { Paciente } from '../db/mongo/models/paciente.model.js';
import { Habitacion } from '../db/mongo/models/habitacion.model.js';
import { LogActividad } from '../db/mongo/models/log_actividad.model.js';

export const consulta1 = async (req, res) => {
    try {
        let result = await Paciente.aggregate([
            {
                $project: {
                    edades: {
                        $cond: {
                            if: {
                                $and: [
                                    { $gte: ["$edad", 0] },
                                    { $lte: ["$edad", 17] }
                                ]
                            },
                            then: "Pediatrico",
                            else: {
                                $cond: {
                                    if: {
                                        $and: [
                                            { $gte: ["$edad", 18] },
                                            { $lte: ["$edad", 64] }
                                        ]
                                    },
                                    then: "Mediana",
                                    else: "Geriatrico"
                                }
                            }
                        }
                    },
                    value: 1
                }
            },
            {
                $group: {
                    _id: "$edades",
                    pacientes: { $sum: 1 }
                }
            }
        ]);

        console.log(result);

        return res.status(200).json(result);

    } catch (error) {
        console.log('Error al realizar la consulta:', error);
        return res.status(500).json({ message: 'Error al realizar la consulta' });
    }

};

export const consulta2 = async (req, res) => {
    try {

        let result = await LogActividad.aggregate([
            {
                $group: {
                    _id: "$idHabitacion",
                    count: { $sum: 1 }
                }
            }
        ]);
        return res.status(200).json(result);
    } catch (error) {
        console.log('Error al realizar la consulta:', error);
        return res.status(500).json({ message: 'Error al realizar la consulta' });
    }
}

export const consulta3 = async (req, res) => {
    try {
        let result = await Paciente.aggregate([
            {
                $project: {
                    genero: {
                        $cond: {
                            if: {
                                $eq: ["$genero", "Masculino"]
                            },
                            then: "Masculino",
                            else: {
                                $cond: {
                                    if: {
                                        $eq: ["$genero", "Femenino"]
                                    },
                                    then: "Femenino",
                                    else: "Otro"
                                }
                            }
                        }
                    },
                    value: 1
                }
            },
            {
                $group: {
                    _id: "$genero",
                    pacientes: { $sum: 1 }
                }
            }
        ])
        return res.status(200).json(result);


    } catch (error) {
        console.log('Error al realizar la consulta:', error);
        return res.status(500).json({ message: 'Error al realizar la consulta' });
    }
}

export const consulta4 = async (req, res) => {
    try {
        let result = await Paciente.aggregate([
            {
                $group: {
                    _id: "$edad",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 5
            }
        ])
        return res.status(200).json(result);
    } catch (error) {
        console.log('Error al realizar la consulta:', error);
        return res.status(500).json({ message: 'Error al realizar la consulta' });
    }
}

export const consulta5 = async (req, res) => {
    try {
        let result = await Paciente.aggregate([
            {
                $group: {
                    _id: "$edad",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    count: 1
                }
            },
            {
                $limit: 5
            }
        ])
        return res.status(200).json(result);
    } catch (error) {
        console.log('Error al realizar la consulta:', error);
        return res.status(500).json({ message: 'Error al realizar la consulta' });
    }
}