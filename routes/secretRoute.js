var Secret = require('../models').Secret;

module.exports.getSecretList = function(req, res) {

    console.log(req.query);

    console.log(req.secret);

    var queryParams = {};

    if (req.query.content) {
        queryParams.content = {
            "$regex": req.query.content,
            "$options": "i"
        }
    }

    if (req.query.owner) {
        queryParams.owner = req.query.owner;
    }

    var query = Secret.find(queryParams);

    query.where('isPublic', 'true'); // condition

    query.select("username content likes createdAt images");

    query.populate('username', 'firstName lastName', 'User');

    query.populate('likes', 'firstName lastName', 'User')

    query.exec(function(err, secrets) {

        console.log(req.params);

        res.json({
            result: !err,
            data: secrets,
            err: err
        });
    })
}

module.exports.getSecret = function(req, res) {

    console.log(req.params);

    var query = Secret.findById(req.params);

    var select;
    var secretId = req.params.id;

    Secret.findById({}).populate('User').exec(function(err, secret) {

        if (secret.owner != null && secret.owner == req.user.id) {
            select = "username content images isPublic isAnonymous likes forwards createdAt";
            res.json({
                result: !err,
                data: secret,
                err: err
            });
        }
        if (secret.owner != req.user.id) {
            select = "content images isPublic likes";
            res.json({
                result: !err,
                data: secret,
                err: err
            });
        }
    })
}
// Secret.findById(secretId, select, function(err, secret) {
//     res.json({
//         result: !err,
//         data: secret,
//         err: err
//     });
// })



module.exports.createSecret = function(req, res) {
    console.log(req.body);

    // if (!req.body.owner || !req.body.content) 
    if (!req.body.content) {
        return res.json({
            result: false,
            err: 'ERR_INVALID_DATA'
        });

    }

    var secret = new Secret();
    secret.username = req.user.id;
    secret.content = req.body.content;
    secret.isPublic = req.body.isPublic;
    secret.isAnonymous = req.body.isAnonymous;
    secret.images = req.body.images;
    secret.referUsers = req.body.referUsers;


    secret.save(function(err, secretData) {
        res.json({
            result: !err,
            data: secretData,
            err: err
        });
    });
}

module.exports.updateSecret = function(req, res) {

    var id = req.params.id;

    Secret.findById(id, function(err, secret) {
        if (err) {
            return {
                result: false,
                err: 'ERR_SECRET_NOT_FOUND'
            }
        }

        if (req.body.content)
            secret.content = req.body.content;

        if (req.body.isAnonymous != null || req.body.isAnonymous != undefined)
            secret.isAnonymous = req.body.isAnonymous;

        if (req.body.isPublic != undefined)
            secret.isPublic = req.body.isPublic;

        if (req.body.isAnonymous)
            secret.isAnonymous = req.body.isAnonymous;

        console.log(req.body.likes);
        if (req.body.likes) {
            /*
             likes: [{
                 id:'OBJECTID',addFlag:true/false
             }, .... ]
            */

            var addMap = {};
            var removeMap = {};
            for (var i = 0; i < req.body.likes.length; i++) {
                if (req.body.likes[i].addFlag) {
                    addMap[req.body.likes[i].id] = true;
                } else {
                    removeMap[req.body.likes[i].id] = true;
                }
            }

            var list = [];

            for (var i = 0; i < secret.likes.length; i++) {
                var userId = secret.likes[i];

                if (!removeMap[userId]) {
                    list.push(userId);
                }

                if (addMap[userId]) {
                    addMap[userId] = false;
                }
            }

            for (var key in addMap) {
                if (addMap[key])
                    list.push(key);
            }

            secret.likes = list;

        }

        secret.save(function(err, savedSecret) {
            return res.json({
                result: !err,
                data: savedSecret,
                err: err
            });
        })


    });


}

module.exports.deleteSecret = function(req, res) {
    var id = req.params.id;

    if (!id) {
        return res.json({
            result: false,
            err: 'ERR_PARAM_ERR'
        });
    }

    Secret.findById(id).remove(function(err) {
        if (err) {
            return res.json({
                result: false,
                err: 'ERR_DB_ERR'
            });
        }
        return res.json({
            result: true
        })
    })
}