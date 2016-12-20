var Message = require('../models/message');

module.exports = {
    get: function GetMessages(req, res) {
        Message.find({}).exec(function (err, result) {
            res.send(result);
            console.log(result);
        })
    },
    post: function (req, res) {
        console.log(req.body);
        var message = new Message(req.body);
        message.save();
        res.status(200);
    }
}
