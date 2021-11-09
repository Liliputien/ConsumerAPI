export default class container {
    _apisDescription;
    _configuration;

    constructor({ apisDescription, configuration }) {
        this._apisDescription = apisDescription;
        this._configuration = configuration;
    }

    get(apiDescriptionName, connexion = "default") {
        let api = new this._apisDescription[apiDescriptionName]()
        api.setConfiguration(this._configuration).setConnexion(connexion)

        return api
    }
}