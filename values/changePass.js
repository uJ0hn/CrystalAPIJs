import User from "../interfaces/user.js";

class ChangePass {

    api
    owner
    json = {}

    constructor(owner, api) {
        this.api = api
        this.owner = owner
        if(!(owner instanceof User)) {
            throw new Error("Usuario invalido")
        }
        this.json["user"] = owner.getName()
    }

    setPass(newpass) {
        if(typeof newpass !== "string") {
            new Error("Senha invalida")
        }
        this.json["newpass"] = newpass
        return this
    }

    async build() {
        const headers = new Headers(this.json)
        headers.append("Authorization", `Bearer ${this.api.token}`)
        headers.append("action", "changeuserpass")


        const response = fetch(this.api.url, {
            headers: headers,
            method: "GET"
        })

        const result = await (await response).text()
        const json = JSON.parse(result)
        if(json.error !== "null") {
            throw new Error(json.error)
        } else {
            return this.owner
        }
    }


}
export default ChangePass