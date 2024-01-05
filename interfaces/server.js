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


    async sendAction(action) {
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${this.api.token}`)
        headers.append("action", "sendaction")
        headers.append("id", this.getId())
        headers.append("action1", action)
        const response = fetch(this.api.url, {
            headers: headers,
            method: "GET"
        })

        const result = await (await response).text()
        const json = JSON.parse(result)
        if(json.error !== "success") {
            throw new Error(json.error)
        } else {
            return "success"
        }
    }


}
module.exports = Server