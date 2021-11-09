import axios from "axios"

export default {
    baseUrl: "https://jsonplaceholder.typicode.com/",
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    connexions: [
        { name: "default", baseUrl: "https://jsonplaceholder.typicode.com/"},
        { name: "rescue", baseUrl: "https://jsonplaceholder2.typicode.com/"},
    ],
    keyNameStatusCode: "status",
    http: axios,
    errorProcessor: {
        200: (response) => {
            return response.config.method === "delete" ? true : response.data
        },
        201: (response) => {
            return response.data
        },
        404: (response) => {
            console.log(response)
            console.log("route non trouvé")
            return response
        }
    }
}