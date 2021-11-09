class consumer {
    _endPoint;
    _baseUrl;
    _configuration;
    _statusCode;
    _http;

    constructor(endPoint) {
        this._endPoint = endPoint;

    }

    setConfiguration(configuration) {
        this._configuration = configuration;
        this._statusCode = Object.keys(configuration.errorProcessor)
        this._errorPreocessor = configuration.errorProcessor
        this._http = configuration.http
        this._keyNameStatusCode = configuration.keyNameStatusCode

        return this
    }

    setConnexion(connexionName) {
        let index = this._configuration.connexions.findIndex(connexion => connexion.name === connexionName)

        this._baseUrl = this._configuration.connexions[index].baseUrl;
    }

    async consume(endPoint, method = "GET", data = {}) {
        let response;

        const headers = {
            headers: {
                ...this._configuration.headers
            }
        }

        try {
            switch(method) {
                case "GET":
                    response = await this._http.get(this._baseUrl + endPoint, headers)
                    break;
                case "POST":
                    response = await this._http.post(this._baseUrl + endPoint, data, headers)
                    break;
                case "PUT":
                    response = await this._http.put(this._baseUrl + endPoint, data, headers)
                    break;
                case "DELETE":
                    response = await this._http.delete(this._baseUrl + endPoint, data, headers)
                    break;
            }
        } catch (error) {
            response = error.response
        }
        const statusCodeStr = response[this._keyNameStatusCode].toString()

        if (this._statusCode.includes(statusCodeStr)) {
            return this._errorPreocessor[statusCodeStr](response)
        }

        return response
    }


    async get() {
        return await this.consume(this._endPoint)
    }

    async edit(id) {
        return await this.consume(this._endPoint + `/${id}`)
    }

    async store(data) {
        return await this.consume(this._endPoint, "POST", data)
    }


    async update(id, data) {
        return await this.consume(this._endPoint + "/" + id, "PUT", data)
    }

    async destroy(id) {
        return await this.consume(this._endPoint + "/" + id, "DELETE")
    }
}


export default consumer