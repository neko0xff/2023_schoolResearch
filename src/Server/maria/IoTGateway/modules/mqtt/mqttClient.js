/*相關函式庫*/
const clock = require("../clock.js");
const mqtt = require("mqtt");

/*MQTT Client*/
var ConfigParser = require("configparser");
const configSet = new ConfigParser();
configSet.read("./modules/config/cnSet.cfg");
configSet.sections();
var ServerSource = configSet.get("MQTT","source");
var port = configSet.get("MQTT","port");
var client = mqtt.connect(`mqtt://${ServerSource}:${port}`);

/*主程式*/
function Sub(topic){
    //訂閱
    client.on("connect", function() {
        console.log(`[${clock.consoleTime()}] Server is Started`);
        client.subscribe(topic, { qos: 1 }); 
    });
    client.on("message", function(top, message) {
        console.log(`[${clock.consoleTime()}] Now topic= ${top}`);
        console.log(`[${clock.consoleTime()}] Now Sub Data= ${message.toString()}`);
    });
}

function Pub(topic,value,timer){
    setInterval(function() {    
        client.publish(topic, value, { qos: 0, retain: true });
    }, timer);
}

function Pub_hour(topic,value,timer){
    var setHour = timer * (60 * 60 * 1000);
    setInterval(function() {    
        client.publish(topic, value, { qos: 0, retain: true });
    }, setHour);
}

module.exports={
    Pub:Pub,
    Pub_hour:Pub_hour,
    Sub:Sub,
};