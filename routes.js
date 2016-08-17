
var userRoute = require('./routes/userRoute');
var secretRoute = require('./routes/secretRoute');
var commentRoute = require('./routes/commentRoute');


module.exports = function(app){
    
    
    app.post('/login',userRoute.login);

    app.post('/user',userRoute.createUser);
    
    //user
    
    app.get('/user', userRoute.getUserList);
    
    app.get('/user/:userId', userRoute.ensureAuthenticated, userRoute.getUser);
    
    app.put('/user/:userId',userRoute.updateUser);
        
    app.delete('/user/:userId',userRoute.deleteUser);
    
    //secret
    
    app.get('/secret',secretRoute.getSecretList);
    
    app.get('/secret/:secretId',secretRoute.getSecret);
    
    app.post('/secret',secretRoute.createSecret);
    
    app.put('/secret/:secretId',secretRoute.updateSecret);
    
    app.delete('/secret/:secretId', secretRoute.deleteSecret);
    
    //comment
    
    app.get('/comment',commentRoute.getCommentList);
    
    app.get('/comment/:id',commentRoute.getComment);
    
    app.post('/comment',commentRoute.createComment);
    
    app.delete('comment/:id', commentRoute.deleteComment);
}