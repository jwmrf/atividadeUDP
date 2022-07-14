var dgram = require('dgram');
const readline = require('readline')
var s = dgram.createSocket('udp4')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.addListener('line', line => {
    s.send(Buffer.from(line), 5000, 'localhost')
})

s.on('message', function(msg, rinfo) {
    console.log(`Servidor: ${msg}`)
})

s.connect(5000,'127.0.0.1')