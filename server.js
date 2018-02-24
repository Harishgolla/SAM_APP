/**
 * Created by jaburur on 16-07-2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//Public enable folder
app.use(express.static(__dirname +'/web'));
//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


/// custom module
var theApp = require('./server/app.js');

var db = require('./server/db.js');
db.init();
var fo = require('./server/file.js');
var sessionModel = require('./server/session.js');
var _session = sessionModel(null);
var utils = require('./server/utils.js');







// routes will go here
// start the server
//get Views
app.get('/getView',function(req,res){

    var file = "login";
    if(_session){
        if(_session.isAdmin() && req.query.view=='login'){
            file ="dashboard";
        }
        else {
            file = req.query.view;
        }
    }
    else {
        file = req.query.view;
    }

    fo.readHTML(file,function(state,data){
        var result = utils.viewResponse(_session,state,file,data);
        res.json(result);
    });
});

//Landing
app.get('/index', function (req, res) {
    res.sendFile( __dirname + "/web/index.html" );
});

//Current User Details
app.get('/userDetails',function(req,res){
    if(_session){
        res.json(utils.jsonResponse(_session,true,_session.getRawData()));
    }
    else {
        res.json(utils.jsonResponse(_session,true,{}));
    }
});

// Home
app.get('/homeDetails',function(req,res){
    db.getHomeDetails(function(status,data){
        res.json(utils.jsonResponse(_session,status,data));
    });
});


//Mobile Login
app.post('/mobileLogin',function(req,res) {


    var userName = req.body.username;
    var password = req.body.password;
    var fireBaseId = req.body.fireBaseId;

    var searchObj = {
        fireBaseId:fireBaseId,
        password: password
    };
    if (isNaN(userName)) {
        searchObj.email = userName.toLowerCase();
    }
    else {
        searchObj.mobileNo = userName
    }

    db.mobileLogin(searchObj, function (status, data) {
        //_session.update(data);
        res.json(utils.jsonResponse(_session, status, data));
    });

});
app.post('/appInfo',function(req,res){

    var userID = req.body.userId;

    db.appInfo({userId:userID}, function (status, data) {
        //_session.update(data);
        res.json(utils.jsonResponse(_session, status, data));
    });

});
// mobile logout
app.post('/mobileLogout',function(req,res) {
    var email = req.body.email;
    var searchObj = {
        email: email.toLowerCase()
    };

    db.mobileLogout(searchObj, function (status, data) {
        //_session.update(data);
        res.json(utils.jsonResponse(_session, status, data));
    });

});
//Login
app.post('/login',function(req,res) {
    var userName=req.body.username;
    var password=req.body.password;
    //fcm.send(fcm.prepareNotification());
    db.login({userName:userName,password:password},function(status,data){
        _session.update(data);
        res.json(utils.jsonResponse(_session,status,data));
    });

});
app.post('/logout', function (req, res) {
    _session.update(null);
    res.json(utils.jsonResponse(_session,true,{logout:"success"}));
});

//Appartement
app.post('/saveAppartement',function(req,res){
    var appartement = {
        id:req.body.id,
        name:req.body.name,
        floors:req.body.floors,
        address:req.body.address
    };

    db.saveAppartement(appartement,function(status,data){
        res.json(utils.jsonResponse(_session,status,data));
    });
});
app.post('/deleteAppartement',function(req,res){
    var appartement = {
        name:req.body.name
    };
    db.deleteAppartement(appartement,function(status,data){
        res.json(utils.jsonResponse(_session,status,{}));
    });
});
app.get('/appartementDetails',function(req,res){
    db.getAppartmentDetails(function(status,data){
        res.json(utils.jsonResponse(_session,status,data));
    });
});

//Manager
app.post('/saveManager',function(req,res){
    var user = {
        id:req.body.id,
        name:req.body.name,
        email:req.body.email.toLowerCase(),
        password:req.body.password,
        mobileNo:req.body.mobileNo,
        roles:req.body.roles.split(","),
        appartements:req.body.appartements.split(",")
    };

    db.saveManager(user,function(status,data){
        res.json(utils.jsonResponse(_session,status,{}));
    });
});
app.post('/saveManager',function(req,res){
    var user = {
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        mobileNo:req.body.mobileNo,
        roles:req.body.roles.split(","),
        appartements:req.body.appartements.split(",")
    };

    db.saveManager(user,function(status,data){
        res.json(utils.jsonResponse(_session,status,{}));
    });
});
app.post('/deleteManager',function(req,res){
    var user = {
        id:req.body.id
    };
    db.deleteManager(user,function(status,data){
        res.json(utils.jsonResponse(_session,status,{}));
    });
});
app.get('/allManagerDetails',function(req,res){
    db.getAllManagerDetails(function(status,data){
        res.json(utils.jsonResponse(_session,status,data));
    });
});

//User
app.post('/saveUser',function(req,res){
    var user = {
        id:req.body.id,
        name:req.body.name,
        password:req.body.password,
        email:req.body.email.toLowerCase(),
        mobileNo:req.body.mobileNo,
        roles:req.body.roles,
        appartements:req.body.appartements
    };

    db.saveUser(user,function(status,data){
        res.json(utils.jsonResponse(_session,status,data));
    });
});
app.post('/deleteUser',function(req,res){
    var user = {
        id:req.body.id
    };
    db.deleteUser(user,function(status,data){
        res.json(utils.jsonResponse(_session,status,{}));
    });
});

///////////////////////////////////////////////////
app.get('/allUserDetails',function(req,res){
    db.getAllUserDetails(function(status,data){
        res.json(utils.jsonResponse(_session,status,data));
    });
});

//Tickets
app.post('/saveTicket',function(req,res){
    /*
    Ticket Details
     Type: ["Electrical","Plumbing"]
     //User:
     //Manager:
     //Appartement:
     Priority: Critical, High, Medium, Low
     Status: Open, InProgress, Closed, Reopen,
     Summary:
     */


    var ticket = {
        //pre declared
        id:req.body.id,
        no:new Date().getTime(),
        // user given
        type:req.body.type,
        user:req.body.user,
        appartement:req.body.appartement,
        manager:req.body.manager,
        priority:req.body.priority,
        status:req.body.status,
        description:req.body.description,
        createdDate:new Date(req.body.createdDate),
        modifiedDate:new Date(req.body.createdDate),
        isManagerAction:req.body.isManagerAction
    };
    if(ticket.id){
        delete ticket.createdDate;
        ticket.modifiedDate =new Date(req.body.modifiedDate);
    }

    db.saveTicket(ticket,function(status,data){
        res.json(utils.jsonResponse(_session,status,ticket));
    });
});
app.post('/deleteTicket',function(req,res){
    var ticket = {
        id:req.body.id
    };

    db.deleteTicket(ticket,function(status,data){
        res.json(utils.jsonResponse(_session,status));
    });
});
app.post('/userTicket',function(req,res) {
    var userID = req.body.userId;
    var appartementId = req.body.appartementId;
    db.userTicket({userId:userID,appartementId:appartementId},function (status, data) {
        res.json(utils.jsonResponse(_session, status, data));
    });
});
app.post('/managerTicket',function(req,res) {
    var userID = req.body.userId;
    var appartementId = req.body.appartementId;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;


    db.managerTicket({userId:userID,appartementId:appartementId,startDate:startDate,endDate:endDate},function (status, data) {
        res.json(utils.jsonResponse(_session, status, data));
    });
});

app.get('/allTicketDetails',function(req,res){
    db.getAllTicketDetails(function(status,data){
        res.json(utils.jsonResponse(_session,status,data));
    });
});


app.get('/getVideos',function(req,res){
    fo.readJSON('videos',function(state,data){ 
        res.json(data);
    });
});

//end server
//app.listen(theApp.port);
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
    console.log('a user connected'+socket.id);
    socket.on('TicketCreated',function(){
            console.log('Ticket Created By: '+socket.id);
            var allSocket = io.sockets.sockets;
            allSocket.forEach(function(soc){

                if(soc.id!= socket.id){
                    soc.emit('Ticket',{data:"test"})
                }

            });


        });

    socket.on('disconnect',function(){
        console.log('a user disconnected'+socket.id);
    });
});

http.listen(theApp.port, function(){
    console.log('listening on *:'+theApp.port);
});

console.log('Server started! At http://'+theApp.ip+':' + theApp.port);



