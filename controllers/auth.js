var User = require('../models/user');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {

    register: function (req, res) {
        var user = new User(req.body);
        User.findOne({
            email: req.body.email
        }, function (err, existingUser) {

            if(existingUser)
                return res.status(409).send({
                    message: 'Email already exists...'
                })

            user.save(function (err, res) {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                    res.status(200).send({token: createToken(res)});
                }
            });

        });
    }
}

function createToken(user){
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payload, 'secret')
}
