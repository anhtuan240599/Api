const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
    
    name :String,
    description:String,
    image : String,
    admin : {type:Schema.Types.ObjectId, ref:'User'},
    users: [{ type: Schema.Types.ObjectId , ref : 'User'}],

    decks: [{ type: Schema.Types.ObjectId , ref : 'DeckGroup'}],

})

const Group = mongoose.model('Group',GroupSchema)

module.exports = Group
