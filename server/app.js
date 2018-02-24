/**
 * Created by jaburur on 21-07-2017.
 */
var config = {
    sessionExpiresTime:1000 * 600, //(micro seconds * seconds) = minutes
    port:process.env.PORT || 8080,
    protocol :"https",
    ip:"lakalakalaka.herokuapp.com",
    mongoDBConnection:"mongodb://<Samapp>:<lakalakalaka>@ds239128.mlab.com:39128/sam_app",//"mongodb://localhost:27017/Ticketing",
    fcmServerKey:"AAAA41C0U6s:APA91bHdRWhXhNcFKmxM_jYTigjxF4A82XOak3Bt8lIpaKeEFqqoqN1Qjkr8Vxkg3sI8vpMoj70l1OrcXzQKXpRxb9EYEtA3V7Q9MgLHBcUmmS-O6VDaa6jXKd1qEDwJvi4CvcpSSscb",
    appSetting:{
        ticketType:{
            type_0:{
                webIcon:"",
                mobileIcon:"",
                name:"Select Type",
                color:""
            },
            type_1:{
                webIcon:"fa fa-circle",
                mobileIcon:"&#f111;",
                name:"CABLE",
                color:"#ff0000"
            },
            type_2:{
                webIcon:"fa fa-internet-explorer",
                mobileIcon:"&#f26b;",
                name:"INTERNET",
                color:"#ff0000"
            },
            type_3:{
                webIcon:"fa fa-phone",
                mobileIcon:"&#f095;",
                name:"PHONE/CELL",
                color:"#ff0000"
            },
            type_4:{
                webIcon:"fa fa-bolt",
                mobileIcon:"&#f0e7;",
                name:"ELECTRIC",
                color:"#ff0000"
            },
            type_5:{
                webIcon:"fa fa-circle",
                mobileIcon:"&#f111;",
                name:"GAS",
                color:"#ff0000"
            },
            type_6:{
                webIcon:"fa fa-tint", //fa-shower
                mobileIcon:"&#f043;", //f2cc
                name:"WATER",
                color:"#ff0000"
            },
            type_7:{
                webIcon:"fa fa-circle",
                mobileIcon:"&#f111;",
                name:"SEWER",
                color:"#ff0000"
            },
            type_8:{
                webIcon:"fa fa-trash",
                mobileIcon:"&#f1f8;",
                name:"TRASH",
                color:"#ff0000"
            },
            type_9:{
                webIcon:"fa fa-circle",
                mobileIcon:"&#f111;",
                name:"LANDSCAPING",
                color:"#ff0000"
            },
            type_10:{
                webIcon:"fa fa-circle",
                mobileIcon:"&#f111;",
                name:"HOUSE CLEANING",
                color:"#ff0000"
            },
            type_11:{
                webIcon:"fa fa-fire-extinguisher",
                mobileIcon:"&#f134;",
                name:"PEST CONTROL",
                color:"#ff0000"
            },
            type_12:{
                webIcon:"fa fa-asterisk",
                mobileIcon:"&#f069;",
                name:"Other",
                color:"#ff0000"
            }
        },
        // Critical, High, Medium, Low
        ticketPriority:{

            priority_0:{
                webIcon:"",
                mobileIcon:"",
                color:"",
                name:"Select Priority"
            },
            priority_1:{
                webIcon:"fa fa-exclamation-triangle",
                mobileIcon:"&#f071;",
                color:"#ff0000",
                name:"Critical"
            },
            priority_2:{
                webIcon:"fa fa-exclamation-triangle",
                mobileIcon:"&#f071;",
                color:"#ff6e00",
                name:"High"
            },
            priority_3:{
                webIcon:"fa fa-exclamation-triangle",
                mobileIcon:"&#f071;",
                color:"#ff5d00",
                name:"Medium"
            },
            priority_4:{
                webIcon:"fa fa-exclamation-triangle",
                mobileIcon:"&#f071;",
                color:"#fff200",
                name:"Low"
            }
        },
        //Open, InProgress, Closed, Reopen,
        ticketStatus:{
            status_0:{
                webIcon:"",
                mobileIcon:"",
                color:"",
                name:"Select Status"
            },
            status_1:{
                webIcon:"fa fa-ticket",
                mobileIcon:"&#f145;",
                color:"#ff0000",
                name:"Open"
            },
            status_2:{
                webIcon:"fa fa-ticket",
                mobileIcon:"&#f145;",
                color:"#ffdd00",
                name:"InProgress"
            },
            status_3:{
                webIcon:"fa fa-ticket",
                mobileIcon:"&#f145;",
                color:"#00ff21",
                name:"Closed"
            },
            status_4:{
                webIcon:"fa fa-ticket",
                mobileIcon:"&#f145;",
                color:"#00d8ff",
                name:"Reopen"
            }
        }
    }
};

module.exports = config;