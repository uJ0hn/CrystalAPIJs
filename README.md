
# CrystalAPIJs
O CrystalAPIJs é um recurso que se conecta ao painel CrystalPanel via requisições HTTP

## Uso
```js
const CrystalAPI = require("crystalapijs")
const api = new CrystalAPI("https://example.com", "TOKEN")
```
## Uso Servidores
```js
const CrystalAPI = require("crystalapijs")
const api = new CrystalAPI("https://example.com", "TOKEN")
const server = await api.getServer('ID')
const serverName = server.getName()
const serverRam = server.getRam()
const serverIp = server.getIp()
const serverNode = await server.getNode()
const serverOwner = await server.getOwner()
const serverType = server.getType()
const serverJar = server.getJar()
const serverStatus = server.getStatus()
server.sendAction('start || stop || kill || restart').then(r => {
console.log(r) ## Sucess ou um erro
})
```

## Download
Você pode fazer a instalação com NPM
```bash
npm install https://github.com/uJ0hn/CrystalAPIJs.git
```
