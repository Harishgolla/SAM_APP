/**
 * Created by jaburur on 22-08-2017.
 */
var theApp = require('./app.js');
var FCM = require('fcm-push');
var fcm = {
    fcm:null,
    init:function(){
        console.log("FCM is ready");
        this.fcm = new FCM(theApp.fcmServerKey);
    },
    prepareNotification:function(to,title,body,data){
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: to,  //'eGdH2s742p8:APA91bEdAD5vqlaHutpc3rQr2OPaoAdGN26eCXdp7KL5PgmTzNvzCuoBw0bm-0AERnEy2iXTdU1jGTaIeuxdq7q51xxlNyS2ZZHvrjkFy29ojJNS2_Hqo8nhTlYXn_lc6rtRxInwVMP1',
            collapse_key: "",

            notification: {
                title: title,
                body: body
            },

            data: {  //you can send only notification or only data(or include both)
                ticketId:data.id ,
                ticketIndex:undefined,
                ticketInfo:data,
                click_action: "show_ticket_info"
            }
        };
        return message;
    },
    send:function(msg){
        this.fcm.send(msg, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }
};


module.exports = fcm;






