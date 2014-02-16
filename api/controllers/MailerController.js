module.exports = {
    send: function (req, res) {

        if (req.param('passkey') != sails.config.mandrill.passkey) {
            return res.json({}, 403);
        }

        var mandrill = require('mandrill-api/mandrill'),
            mandrill_client = new mandrill.Mandrill(sails.config.mandrill.apiKey),
            message = {
                subject: req.param('subject'),
                html: req.param('text'),
                from_email: sails.config.mandrill.from.email,
                from_name: sails.config.mandrill.from.name,
                to: []
            };

        User.find({subscriptions: req.param('channel').id}).done(function (err, users) {
            if (err) {
                console.log(err);
                return res.json({}, 500);
            }

            for (var i = 0, l = users.length; i < l; i++) {
                message.to.push({email: users[i]['email']});
            }

            var directive = {
                message: message,
                async: true
            };
            if (req.param('send_at')) directive.send_at = req.param('send_at');

           mandrill_client.messages.send(directive,
                function (result) {
                    return res.json(result);
                },
                function (error) {         
                    return res.json(error, 500);
                }
            );
        });
    }
};