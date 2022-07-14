var dgram = require('dgram');
const readline = require('readline')
var client_port = null
var server = dgram.createSocket('udp4')

server.on('message', function(msg, rinfo) {
    console.log(`Cliente: ${msg}`)
    client_port = rinfo.port
})

server.on('listening',function(){
    var port = address.port;
    console.log('Servidor listado na porta ' + port);
});

server.bind(5000, function() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.addListener('line', line => {
        server.send(Buffer.from(line), client_port, 'localhost')
    })
});