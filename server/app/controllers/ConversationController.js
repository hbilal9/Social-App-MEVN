const Conversation = require('../models/Converation');
const mongoose = require('mongoose');

exports.getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        return res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.createConversation = async (req, res) => {
    try {
        // const conversation = await Conversation.find({});
        const conversation = new Conversation({
            members: [req.user._id, mongoose.Types.ObjectId(req.body.receiverId)]
        })
        const savedConversation = await conversation.save();
        return res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
}