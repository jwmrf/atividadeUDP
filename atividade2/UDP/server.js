var dgram = require('dgram');
const readline = require('readline')
var client_port = null
var server = dgram.createSocket('udp4', function(data, rinfo) {
})
var client = null
let status = 0
let numberLeft = 0
let numberRight = 0
server.on('message', function(msg, rinfo) {
    data = JSON.parse(msg)
    if (data.type == "connect") {
        client = rinfo
        status = 1
        server.send(Buffer.from("Informe o primeiro número para calcular"), client.port, client.address)
    } else if (data.type == "message") {
        if (status == 0) {
            server.send(Buffer.from("Informe o primeiro número para calcular"), client.port, client.address)
            status ++
        }
        else if (status < 3) {
            try {
                if (status == 1) {
                    numberLeft =  parseFloat(data.message)
                    if (!numberLeft) throw new console.error("");
                    status ++
                    server.send(Buffer.from("Informe o segundo número para calcular"), client.port, client.address)
                } else {
                    numberRight =  parseFloat(data.message)
                    if (!numberRight) throw new console.error("");
                    status ++
                    server.send(Buffer.from("Informe a operação EX: + ou / ou * ou -"), client.port, client.address)
                }
            } catch (error) {
                server.send(Buffer.from("Número inválido"), client.port, client.address)
            }
        } else if(status == 3) {
            let result = null
            switch (data.message) {
                case '+':
                    result = numberLeft + numberRight
                    break;
                case '-':
                    result = numberLeft - numberRight
                    break;
                case '*':
                    result = numberLeft * numberRight
                    break;
                case '/':
                    result = numberLeft / numberRight
                    break;
                    
            }
            if (result) {
                status = 0
                numberLeft = 0
                numberRight = 0
                server.send(Buffer.from(`Resultado: ${result}`), client.port, client.address)
            } else {
                server.send(Buffer.from(`Operação inválida`), client.port, client.address)
            }
        }
    }
    client_port = rinfo.port
})

server.bind(5000, function() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.addListener('line', line => {
        server.send(Buffer.from(line), client_port, 'localhost')
    })
});