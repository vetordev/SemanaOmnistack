const moongose = require('mongoose');

const SpotSchema = new moongose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [ String ],
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User'
        //ref => referência do banco
    }
})

module.exports = moongose.model('Spot', SpotSchema);