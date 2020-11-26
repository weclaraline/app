import axios from 'axios';
import http from 'axios/lib/adapters/http';

class ServiceAPI {
    
    constructor(){}

    createRequest(path) {
        return axios
        .create({
            baseURL: this.getBaseURL(),
            adapter: http
        });
    }

    make() {
        throw new Error("Implement 'make' method");
    }

    getBaseURL() {
        return process.env.NODE_ENV === "production" ? "http://api.weclaraline.testmyapp.info/" : "http://localhost:3000";
    }
}

export default ServiceAPI;