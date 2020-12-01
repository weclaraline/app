import ServiceAPI from "./ServiceAPI"
import { getCurrentLoggedUserGoogleId } from "../utils/LogIn";

class InvoiceUploadService extends ServiceAPI {
    
    constructor(InvoiceUploadRequest){
        super();
        this.request = InvoiceUploadRequest;
    }

    async make(){
        const { data } = await this
                        .createRequest( getCurrentLoggedUserGoogleId() )
                        .post("invoices/upload",this.request);
        return data;
    }
}

export default InvoiceUploadService;