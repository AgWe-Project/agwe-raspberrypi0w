var ip = require('ip');
//Import pi0w hardware interfaces
var sensor = require('node-dht-sensor');
var handler = require('./web/server.js');

//Start Socket.Import
var app = require('http').createServer(handler)
var io = require('socket.io')(app);

var monitor = {
  temphumidListener: function () {
    sensor.read(22, 4, function(err, temperature, humidity) {
      if (!err) {
        io.emit('temp', {temp: temperature.toFixed(1)});
        io.emit('humid', {humid: humidity.toFixed(1)});
      }
    });	
  }
};

io.on('connection', function (socket) {
  console.log("Socket IO Connected");
  setInterval(monitor.temphumidListener, 30000);
});

app.listen(80);
console.log("Server running at ", ip.address());
