
var userRoute = require('./routes/userRoute');
var secretRoute = require('./routes/secretRoute');
var commentRoute = require('./routes/commentRoute');


module.exports = function(app){
    
    
    app.post('/login',userRoute.login);

    app.post('/user',userRoute.createUser);
    
    //user
    
    app.get('/user', userRoute.getUserList);
    
    app.get('/user/:id', userRoute.ensureAuthenticated, userRoute.getUser);
    
    app.put('/user/:id',userRoute.updateUser);
        
    app.delete('/user/:id',userRoute.deleteUser);
    
    //secret
    
    app.get('/secret',secretRoute.getSecretList);
    
    app.get('/secret/:id',secretRoute.getSecret);
    
    app.post('/secret',secretRoute.createSecret);
    
    app.put('/secret/:id',secretRoute.updateSecret);
    
    app.delete('/secret/:id', secretRoute.deleteSecret);
    
    //comment
    
    app.get('/comment',commentRoute.getCommentList);
    
    app.get('/comment/:id',commentRoute.getComment);
    
    app.post('/comment',commentRoute.createComment);
    
    app.delete('comment/:id', commentRoute.deleteComment);
}