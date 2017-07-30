let mongoose = require('mongoose'),
    conn = mongoose.createConnection('mongodb://127.0.0.1/201704chat');

mongoose.Promise = Promise;
let MessageSchema = new mongoose.Schema({
    author: String,
    content: String,
    createAt: {
        type: Date,
        default: Date.now
    }
});
let Message = conn.model('Message', MessageSchema);
module.exports = Message;
