const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const { string } = require('@hapi/joi')
const UserSchema = new Schema({
    fullName: {
        type: String
    },
    name: {
        type: String,
    },
    avatar:{
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type : String,
    },
    following:[{
        type: Schema.Types.ObjectId
    }],
    followers:[{
        type: Schema.Types.ObjectId
    }],
    yearID:{
        type: Schema.Types.ObjectId,
        ref: "Year"
    },
    role: {
        type:String
    },
    phone:{
        type: String
    },
    gender: {
        type: String
    },
    background:{
        type: String
    },
    authGoogleID: {
        type:String,
        default:null
    },
    authFacebookID: {
        type:String,
        default:null
    },
    authType: {
        type:String,
        enum: ['local','google','facebook'],
        default: 'local'
    },
    decks: [{
        type: Schema.Types.ObjectId,
        ref : 'Deck'
    }],
    address: { type: Schema.Types.ObjectId, ref:"Address" }
    
})

UserSchema.methods.isValidPassword = async function(newPassword) {
    try{
        console.log(newPassword,this.password)
        return await bcrypt.compare(newPassword, this.password)
       
    } catch (error) {
        throw new Error(error)
    }
}

UserSchema.methods.comparePassword = function (password,next) {
    let user = this;
    return bcrypt.compareSync(password, user.password)
    
}

UserSchema.pre('save', async function (next) {
    try {
        if(this.authType !== 'local') next()

        if(this.password.length > 50) next()
        
        const salt = await bcrypt.genSalt(10)

        const passwordHashed = await bcrypt.hash(this.password, salt)

        this.password = passwordHashed

        next()
    } catch (error) {
        next(error)
    }
    
})

const User = mongoose.model('User',UserSchema)

module.exports = User
