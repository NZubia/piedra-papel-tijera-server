const {
    SesionModel
} = require('../models/game.model');
async function jugar(req, res){
    const opciones = ["fire", "water", "grass"];
    const jugador2 = opciones[Math.floor(Math.random() * (opciones.length - 0 + 1))];

    const jugador1 = req.body.eleccion;
    const sesionUsuario = req.body.sesionUsuario;

    const respuestaJuego = {
        resultado: "Empato",
        ganados: sesionUsuario.ganados,
        perdidos: sesionUsuario.perdidos
    }

    // Actualizar resultado de juego
    if (jugador1 === jugador2) {
        return res.status(200).json(respuestaJuego);
    } else {
        if (
            (jugador1 === "fire" && jugador2 === "grass") ||
            (jugador1 === "water" && jugador2 === "fire") ||
            (jugador1 === "grass" && jugador2 === "water")
        ) {
            sesionUsuario.ganados += 1;
            respuestaJuego.resultado = "Ganaste";

        } else {
            sesionUsuario.perdidos += 1;
            respuestaJuego.resultado = "Perdiste";
        }

        respuestaJuego.ganados = sesionUsuario.ganados;
        respuestaJuego.perdidos = sesionUsuario.perdidos;

        console.log(jugador2);

        // Actualizar historial
        sesionUsuario.historiaUsuario.push(jugador1);
        sesionUsuario.historiaCPU.push(jugador2);
        console.log(sesionUsuario);

        // Guardar actualización en base de datos
        await sesionUsuario.save();

        res.status(200).json(respuestaJuego);
    }
}

async function regresarPartida(req, res){
    const userName = req.body.nombUs;
    const equipoElegido = req.body.equipoElegido;

    try {
        // Check sesion existense
        const userSesion = await SesionModel.findOne({
            nombreUsuario: userName
        })

        console.log(userSesion);
        // Return sesion if exists
        if (userSesion) {
            res.status(200).json({
                infoPartida: userSesion
            })
        } else {
            const newSesion = await new SesionModel({
                nombreUsuario: userName,
                equipoElegido: equipoElegido
            }).save();

            res.status(200).json({
                infoPartida: newSesion
            })
        }
    } catch (e) {
        console.log(e);
    }
}

async function validarSesion(req, res, next){
    const idSesion = req.body.idSes;

    const sesionUsuario = await SesionModel.findOne({
        _id:idSesion
    })

    if (sesionUsuario) {
        req.body.sesionUsuario = sesionUsuario;
        next();
    } else {
        res.status(400).json({
            mensaje: "Sesión Inválida"
        })
    }
}

module.exports = {
    validarSesion,
    jugar,
    regresarPartida
};
