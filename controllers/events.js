const {response} = require('express')

const getEventos = ( req, res = response) => {


    res.status(200).json({
        ok: true,
        msg: 'getEvento'
    })
}
const crearEvento = ( req, res = response) => {


    res.status(200).json({
        ok: true,
        msg: 'crearEvento'
    })
}
const actualizarEvento = ( req, res = response) => {


    res.status(200).json({
        ok: true,
        msg: 'actualizarEvento'
    })
}
const eliminarEvento = ( req, res = response) => {


    res.status(200).json({
        ok: true,
        msg: 'elminarEvento'
    })
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}