
var userRoute = require('./routes/userRoute');



module.exports = function(app){
    
    app.get('/user', userRoute.getUserList);
    
    app.get('/user/:id', userRoute.getUser);
    
    app.post('/user', userRoute.createUser);
}