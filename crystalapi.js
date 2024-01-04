import Users from "./interfaces/user.js"
import Server from "./interfaces/server.js"
import Node from "./interfaces/node.js"
import CreateUser from "./values/createUser.js";
class CrystalAPI {

    url

    token
    valid

    constructor(url, token) {
        if(url.endsWith("/")) url = url.slice(0, -1)
        this.url = url + "/api/v1"
        this.token = token
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${token}`)
        fetch(this.url, {
            headers: headers,
            method: "GET"
        })
            .then(response => response.text())
            .then(result => {
                console.log(result)
                const json = JSON.parse(result)
                if(json.error !== "null") {
                    this.valid = false
                    throw new Error(json.error)
                }
                this.valid = true
            })
    }

    async getUser(user) {
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${this.token}`)
        headers.append("action", "getuser")
        headers.append("user", user)
        const response = fetch(this.url, {
            headers: headers,
            method: "GET"
        })

        const result = await (await response).text()
        const json = JSON.parse(result)
        if(json.error !== "null") {
            throw new Error(json.error)
        } else {
            return new Users(json, this)
        }
    }


    createUser() {
        return new CreateUser(this)
    }

    async getNode(nodeid) {
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${this.token}`)
        headers.append("action", "getnode")
        headers.append("id", nodeid)
        const response = fetch(this.url, {
            headers: headers,
            method: "GET"
        })

        const result = await (await response).text()
        const json = JSON.parse(result)
        if(json.error !== "null") {
            throw new Error(json.error)
        } else {
            return new Node(json, this)
        }
    }

    async getServer(serverid) {
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${this.token}`)
        headers.append("action", "getserver")
        headers.append("id", serverid)
        const response = fetch(this.url, {
            headers: headers,
            method: "GET"
        })

        const result = await (await response).text()
        const json = JSON.parse(result)
        if(json.error !== "null") {
            throw new Error(json.error)
        } else {
            return new Server(json, this)
        }
    }

}

export default CrystalAPI