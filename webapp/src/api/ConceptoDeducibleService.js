import ServiceAPI from "./ServiceAPI"

class ConceptoDeducibleService extends ServiceAPI {
    
    constructor(ConceptoDeducibleRequest){
        super();
        this.request = ConceptoDeducibleRequest;
    }

    async make(){
        const { data } = await this
                        .createRequest()
                        .get("/recommendations",this.request);
        return data;
    }
}

export default ConceptoDeducibleService;