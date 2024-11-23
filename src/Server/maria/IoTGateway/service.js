/*模組化啟用*/  
var httpAPI=require("./rules/http/router.js"); //HTTP api
var mqttBroker=require("./modules/mqtt/mqttBroker.js"); //MQTT Broker


/*呼叫內容*/
function startServer(){
    httpAPI;
    mqttBroker;
}

/*組成一個函式去呼叫*/
if(require.main === module){
    startServer();
}else{
    module.exports= startServer;
}
