class Server {
    json
    api
    constructor(json, api) {
        this.json = json
        this.api = api
    }

    getName() {
        return this.json["name"]
    }
    getRam() {
        return this.json["ram"]
    }
    getIp() {
        return this.json["ip"]
    }
    getPorts() {
        return this.json["port"]
    }

    async getNode() {
        return await this.api.getNode(this.json["node"])
    }

    async getOwner() {
        return await this.api.getUser(this.json["owner"])
    }

    getType() {
        return this.json["type"]
    }
    getJar() {
        return this.json["jar"]
    }
    getId() {
        return this.json["id"]
    }
    getStatus() {
        return this.json["status"]
    }



}
export default Server