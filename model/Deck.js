const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeckSchema = new Schema({
    name : { type :String},

    description : {type:String},
    total : {
        type: Number,
        default : 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: Object
    },
    cloudinaryID: {
        type: Array
    },
    rating: {
        type: false
    }
    
})

const Deck = mongoose.model('Deck',DeckSchema)

module.exports = Deck
