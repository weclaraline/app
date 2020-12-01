import ServiceAPI from "./ServiceAPI"
import { getCurrentLoggedUserGoogleId } from "../utils/LogIn";
class DeductiblesConceptService extends ServiceAPI {
    
    constructor(ConceptoDeducibleRequest){
        super();
        this.request = ConceptoDeducibleRequest;
    }

    async make(){
        const { data } = await this
                        .createRequest( getCurrentLoggedUserGoogleId() )
                        .get("/recommendations",this.request);
        return data;
    }
}

export default DeductiblesConceptService;