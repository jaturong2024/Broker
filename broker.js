const broker = require("aedes")();
const mqtt = require("net").createServer(broker.handle);

mqtt.listen(1883, () => {
  console.log("MQTT server listening on port 1883");
});
