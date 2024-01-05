
class Node {

    json
    api

    constructor(json, api) {
        this.json = json
        this.api = api
    }

    getId() {
        return this.json["id"]
    }

    getIp() {
        return this.json["ip"]
    }

    getUrl() {
        return this.json["url"]
    }

    getStatus() {
        return this.json["status"]
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
module.exports = Node