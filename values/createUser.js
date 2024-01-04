class CreateUser {
    api
    constructor(api) {
        this.api = api
    }

    json = {}

    setName(name) {
        this.json["name"] = name
        return this
    }

    setEmail(email) {
        this.json["email"] = email
        return this
    }

    setPassword(password) {
        this.json["password"] = password
        return this
    }

    setAdmin(boolean) {
        let admin
        if(boolean) admin = 1
        else admin = 2
        this.json["admin"] = admin
        return this
    }


    async build() {
        const headers = new Headers(this.json)
        headers.append("Authorization", `Bearer ${this.api.token}`)
        headers.append("action", "usercreate")


        const response = fetch(this.api.url, {
            headers: headers,
            method: "GET"
        })

        const result = await (await response).text()
        const json = JSON.parse(result)
        if(json.error !== "null") {
            throw new Error(json.error)
        } else {
            return "success"
        }
    }



}
export default CreateUser