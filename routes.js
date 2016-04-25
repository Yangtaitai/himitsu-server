
var userRoute = require('./routes/userRoute');
var secretRoute = require('./routes/secretRoute');


module.exports = function(app){
    
    app.get('/user', userRoute.getUserList);
    
    app.get('/user/:id', userRoute.getUser);
    
    app.post('/user', userRoute.createUser);
    
    app.post('/secret',secretRoute.createSecret);
}