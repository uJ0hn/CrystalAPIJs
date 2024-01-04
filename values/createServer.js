import Node from "../interfaces/node.js";
import User from "../interfaces/user.js";

class CreateServer {

    api
    constructor(owner, api) {
        if(!(owner instanceof User)) {
            throw new Error("Precisa ser um usuario valido")
        }
        this.json["owner"] = owner.getName()
        this.api = api
    }

    json = {}

    setName(name) {
        this.json["name"] = name
        return this
    }

    setRam(ram) {
        if(typeof ram !== "number") {
            throw new Error("A ram precisa ter um numero valido")
        }
        this.json["ram"] = ram
        return this
    }


    setNode(node) {
        if(!(node instanceof  Node)) {
            throw new Error("A node precisa ser valida")
        }
        this.json["node"] = node.getId()
        return this
    }

    setType(type) {
        if(type !== "java" && type !== "nodejs") {
            throw new Error("O tipo precisa ser valido, nodejs ou java")
        }
        this.json["type"] = type
        return this
    }

    async build() {
        const headers = new Headers(this.json)
        headers.append("Authorization", `Bearer ${this.api.token}`)
        headers.append("action", "createserver")


        const response = fetch(this.api.url, {
            headers: headers,
            method: "GET"
        })

        const result = await (await response).text()
        const json = JSON.parse(result)
        if(json.error !== "null" && !json.error.includes("success")) {
            throw new Error(json.error)
        } else {
            const id = json.error.split("_")[1]
            return await this.api.getServer(id)
        }
    }


}
export default CreateServer