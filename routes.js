var userRoute = require('./routes/userRoute');
var secretRoute = require('./routes/secretRoute');
var commentRoute = require('./routes/commentRoute');
var imageRoute = require('./routes/imageRoute');

var multer = require('multer');
var upload = multer({ dest: './public/upload' });

module.exports = function(app) {


    app.post('/login', userRoute.login);

    //user

    app.post('/user', userRoute.createUser); //sign up

    app.get('/user', userRoute.getUserList);

    app.get('/user/:id', userRoute.ensureAuthenticated, userRoute.getUser);

    app.put('/user/:id', userRoute.updateUser);

    app.delete('/user/:id', userRoute.deleteUser);

    //secret

    app.get('/secret', secretRoute.getSecretList);

    app.get('/secret/:id', secretRoute.getSecret);

    app.post('/secret', secretRoute.createSecret);

    app.put('/secret/:id', secretRoute.updateSecret);

    app.delete('/secret/:id', secretRoute.deleteSecret);

    app.post('/upload', upload.single('file'), imageRoute.upload);

    //comment

    app.get('/comment', commentRoute.getCommentList);

    app.get('/comment/:id', commentRoute.getComment);

    app.post('/comment', commentRoute.createComment);

    app.delete('comment/:id', commentRoute.deleteComment);
}