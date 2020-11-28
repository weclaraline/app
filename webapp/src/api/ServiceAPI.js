import axios from "axios";
import httpAdapter from "axios/lib/adapters/http";

class ServiceAPI {
    
    constructor() {}

    createRequest() {
        return axios
        .create({
            baseURL: this.getBaseURL(),
            adapter: httpAdapter
        });
    }

    make() {
        throw new Error("Implement 'make' method");
    }

    getBaseURL() {
        return "http://api.weclaraline.testmyapp.info";
        // return process.env.NODE_ENV === "production" ? "http://api.weclaraline.testmyapp.info/" : "http://localhost:3000";
    }
}

export default ServiceAPI;