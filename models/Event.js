const { Schema, model } = require('mongoose'); 

const EventSchema = Schema({

    title: {
        type: String,
        required: true
    }, 

    notes: {
        type: String
    }, 

    start: {
        type: Date, 
        required: true
    },

    end: {
        type: Date, 
        required: true
    },

    user: {
        // Esto le dice a mongoose que es una referencia
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }

}); 

EventSchema.method('toJSON', function(){
    // Acá teno acceso a cada una de las propiedades
    const { __v, _id, ...object } = this.toObject()
    object.id = _id;
    return object;
});

module.exports = model( 'Event', EventSchema ); 

