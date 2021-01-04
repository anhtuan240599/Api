const User = require('../model/User')
const DeckGroup = require('../model/DeckGroup')
const cloudinary = require('../middlewares/cloudinary')
const fullTextSearch = require('fulltextsearch');
const Year = require('../model/Year');
const { findById } = require('../model/User');
const fullTextSearchVi = fullTextSearch.vi;

const getDeckGroup = async (req,res,next) => {
    const group = await Year.findById(req.params.groupID) 
        .populate("decks")
        .populate("users")
        .exec()
    return res.status(200).json({success:true,group : group})
}
const newDeckGroup = async (req, res, next) => {

    const owner = await User.findOne({ _id: req.decoded._id })

    const group = await Year.findById( req.params.groupID )
    const deck = req.body

    delete deck.owner

    deck.owner = owner._id
    const newDeck = new DeckGroup(deck)

    if (req.files) {
        const urls = []
        const ids = []
        for (const File of req.files) {
            const { path } = File
            const result = await cloudinary.uploader.upload(path);
            urls.push(result.secure_url)
            ids.push(result.public_id)

        }

        newDeck.image = urls
        newDeck.cloudinaryID = ids
    }

    await newDeck.save()
    group.decks.push(newDeck._id)
    owner.decksGroup.push(newDeck._id)
    await owner.save()
    await group.save()

    return res.status(201).json({ success:true, deck: newDeck })

}

module.exports = {
    newDeckGroup,
    getDeckGroup
}