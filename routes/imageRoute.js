var fs = require('fs');

var uploadImage = function(file, prefix, callback) {
    var imageName = prefix + "_" + file.filename + (file.originalname.substring(file.originalname.lastIndexOf('.')));
    var tempPath = file.path;
    var targetPath = './public/images/' + imageName;
    fs.rename(tempPath, targetPath, function(err) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, imageName);
        }
    });

}

module.exports.upload = function(req, res) {
    console.log(req);

    var file = req.file;

    uploadImage(file, 'secret', function(err, imageName) {
        console.log(imageName);
        res.json({
            result: !err,
            data: imageName,
            err: err
        })
    })
}