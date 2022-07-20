const net = require('net')
let status = 0

const handleConnection = socket => {
    socket.on('error', (err) => {
            console.log("Qualquer erro que possa dar por desconexão ou problemas no socket.")
        }
    )
    socket.on('data', mensagem => {
        let data = JSON.parse(mensagem)
        if (data.type == "message") {
            if (status == 0) {
                socket.write(Buffer.from("Informe o primeiro número para calcular"))
                status ++
            }
            else if (status < 3) {
                try {
                    if (status == 1) {
                        numberLeft =  parseFloat(data.message)
                        if (!numberLeft) throw new console.error("");
                        status ++
                        socket.write(Buffer.from("Informe o segundo número para calcular"))
                    } else {
                        numberRight =  parseFloat(data.message)
                        if (!numberRight) throw new console.error("");
                        status ++
                        socket.write(Buffer.from("Informe a operação EX: + ou / ou * ou -"))
                    }
                } catch (error) {
                    socket.write(Buffer.from("Número inválido"))
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
                    socket.write(Buffer.from(`Resultado: ${result}`))
                } else {
                    socket.write(Buffer.from(`Operação inválida`))
                }
            }
        }
    })
}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1')