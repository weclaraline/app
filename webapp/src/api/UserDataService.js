import ServiceAPI from "./ServiceAPI"
import { getCurrentLoggedUserGoogleId } from "../utils/LogIn";

class UserDataService extends ServiceAPI {
    
    constructor(UserDataRequest){
        super();
        this.request = UserDataRequest;
    }

    async make(){
        const { data } = await this
                        .createRequest( getCurrentLoggedUserGoogleId() )
                        .get("/users",this.request);
        return data;
    }
}

export default UserDataService;