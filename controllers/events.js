const {response} = require('express')
const Evento = require('../models/Evento')

const getEventos = async( req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name')

    res.status(200).json({
        ok: true,
        eventos
    })
}
const crearEvento = async( req, res = response) => {

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;
      const eventoDB =  await evento.save()

      res.status(200).json({
        ok: true,
        evento: eventoDB
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

    
}
const actualizarEvento = async( req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid
    try {
        
        const evento = await Evento.findById( eventoId);
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'Evento inexistente'
            })
        }

        if( evento.user.toString() !== uid ){ //Que el usuario que creo el evento quiera modificarlo
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para modificar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true});

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }


}
const eliminarEvento = async( req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid
    try {
        
        const evento = await Evento.findById( eventoId);
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'Evento inexistente'
            })
        }

        if( evento.user.toString() !== uid ){ //Que el usuario que creo el evento quiera modificarlo
            return res.status(401).json({
                ok: false,
                msg: 'No tiene los permisos para eliminar este evento'
            })
        }

        await Evento.findByIdAndDelete(eventoId);

        res.status(200).json({
            ok: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}