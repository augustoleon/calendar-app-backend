const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async( req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    });
    
};


const createEvent = async( req, res = response) => {
    
    const event = new Event( req.body );

    try {

        event.user = req.uid;

        const eventSaved = await event.save();

        res.status(201).json({
            ok: true, 
            event: eventSaved
        })

    } catch (error) {
        console.log(error); 
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })        
    }


};

const putEvent = async( req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid

    try {

        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            });
        }

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false, 
                msg: 'No tiene privilegio de editar este evento'
            });

        }

        const newEvent = {
            ...req.body, 
            user: uid
        }

        const eventUpdate = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );
        
        res.json({
            ok: true, 
            evento: eventUpdate
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Contactar con el administrador'
        })
        
    }

};

const deleteEvent = async( req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid

    try {

        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            });
        }

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false, 
                msg: 'No tiene privilegio de eliminar este evento'
            });

        }


        await Event.findByIdAndRemove( eventId );
        
        res.json({
            ok: true, 
            evento: 'Evento eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Contactar con el administrador'
        })
        
    }

};

module.exports = {
    getEvents,
    createEvent,
    putEvent,
    deleteEvent
}