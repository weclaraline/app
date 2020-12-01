import ServiceAPI from "./ServiceAPI"
import { getCurrentLoggedUserGoogleId } from "../utils/LogIn";

class FAQService extends ServiceAPI {
    
    constructor(FAQRequest){
        super();
        this.request = FAQRequest;
    }

    async make(){
        const { data } = await this
                        .createRequest( getCurrentLoggedUserGoogleId() )
                        .get("/faq",this.request);
        return data;
    }
}

export default FAQService;