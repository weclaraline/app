import axios from "axios";
import httpAdapter from "axios/lib/adapters/http";

class ServiceAPI {
    
    constructor() {}

    createRequest( userid) {
        return axios
        .create({
            baseURL: this.getBaseURL(),
            adapter: httpAdapter,
            headers: {
                'userid': userid
              }
        });
    }

    make() {
        throw new Error("Implement 'make' method");
    }

    getBaseURL() {
        return "http://api.weclaraline.testmyapp.info";
        //return "http://localhost:3000";

        // return process.env.NODE_ENV === "production" ? "http://api.weclaraline.testmyapp.info/" : "http://localhost:3000";
    }
}

export default ServiceAPI;