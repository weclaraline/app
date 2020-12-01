import ServiceAPI from "./ServiceAPI"
import { getCurrentLoggedUserGoogleId } from "../utils/LogIn";

class InvoicesService extends ServiceAPI {
    
    constructor(InvoicesRequest){
        super();
        this.request = InvoicesRequest;
    }

    async make(month, year){
        const { data } = await this
                        .createRequest( getCurrentLoggedUserGoogleId() )
                        .get(`invoices/${month}/${year}`,this.request);
        return data;
    }
}

export default InvoicesService;