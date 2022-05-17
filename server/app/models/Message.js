const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = mongoose.Schema({
    conversationId: {
        type: ObjectId
    },
    sender: {
        type: ObjectId,
    },
    text: {
        type: String,
    },
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);