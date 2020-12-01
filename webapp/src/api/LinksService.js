import ServiceAPI from "./ServiceAPI"
import { getCurrentLoggedUserGoogleId } from "../utils/LogIn";

class LinksService extends ServiceAPI {
    
    constructor(LinksRequest){
        super();
        this.request = LinksRequest;
    }

    async make(){
        const { data } = await this
                        .createRequest( getCurrentLoggedUserGoogleId() )
                        .get("/links",this.request);
        return data;
    }
}

export default LinksService;