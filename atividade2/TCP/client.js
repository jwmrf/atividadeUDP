const net = require('net')
const readline = require('readline')

const client = new net.Socket()

client.connect(4000, 'localhost', () => {
    var alloc = Buffer.from('{"type":"message"}')
    client.write(alloc)
    rl.addListener('line', line => {
        var object  = '{"type":"message","message":"'+line+'"}';
        client.write(object)
    })
    client.on('data', data => {
        console.log(data.toString())
    })
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})