var dgram = require('dgram');
const readline = require('readline')
var client = dgram.createSocket('udp4')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.addListener('line', line => {
    var object  = '{"type":"message","message":"'+line+'"}';
    var buffer  = Buffer.from(object);
    client.send(buffer, 0, buffer.length, 5000, 'localhost');
    //s.send(Buffer.from(line), 5000, 'localhost')
})

client.on('message', function(msg, rinfo) {
    console.log(`Servidor: ${msg}`)
})

client.on('listening', function() {
    var alloc = Buffer.from('{"type":"connect"}')
	//var buffer = new Buffer('{"type":"connect"}');
	client.send(alloc, 0, alloc.length, 5000, 'localhost');

});
client.bind();
//s.connect(5000,'127.0.0.1')