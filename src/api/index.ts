import { StringStringMap, DevJobs } from '../types'
import locations from './locations'

class ReedClient {
    endpoint: String

    constructor() {
        this.endpoint = "https://duo3pp3wh3.execute-api.us-east-1.amazonaws.com/dev/search"
    }

    buildQueryString(params: StringStringMap): string {
        let query = ""
        for (let param in params) {
            query += `${param}=${params[param]}&`
        }

        return query = query.slice(0, -1)
    }

    getDevJobsByLocation(location: string) {
        let query = {
            'locationName': location
        }

        return fetch(`${this.endpoint}?${this.buildQueryString(query)}`)
        .then(response => response.json())
    }

    getDevJobs() {
        return Promise.all(locations.map(location => this.getDevJobsByLocation(location)))
    }

}

export default ReedClient