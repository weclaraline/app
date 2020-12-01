import axios from "axios";
import httpAdapter from "axios/lib/adapters/http";

class ServiceAPI {
    
    constructor() {}

    createRequest( googleId ) {
        return axios
        .create({
            baseURL: this.getBaseURL(),
            adapter: httpAdapter,
            headers: {
                'userid': googleId
              }
        });
    }

    make() {
        throw new Error("Implement 'make' method");
    }

    getBaseURL() {
        return "http://api.weclaraline.tePstmyapp.info";
    }
}

export default ServiceAPI;