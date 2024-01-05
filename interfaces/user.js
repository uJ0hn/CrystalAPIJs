
const CreateServer = require("../values/createServer.js")
const ChangePass = require("../values/changePass.js")
class User {

    json
    api
    constructor(json, api) {
        this.json = json
        this.api = api
    }

    getName() {
        return this.json.name
    }

    changePass() {
        return new ChangePass(this, this.api)
    }
    createServer() {
        return new CreateServer(this, this.api)
    }

    getEmail() {
        return this.json["email"]
    }

    isAdmin() {
        return this.json["admin"]
    }

    getToken() {
        return this.json["token"]
    }

    async getServers() {
        const list = new Map()
        for (let i = 0; i < this.json["servers"].length; i++) {
            const elemento = this.json["servers"][i];
            list.set(elemento, await this.api.getServer(elemento))
        }
        return list
    }


}

module.exports = User