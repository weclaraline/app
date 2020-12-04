import "../../testing_utils";
import { shallow } from "enzyme";
import ConceptoDeduciblesComponent from "../../../../components/facturas/ConceptoDeduciblesComponent";
import { generateDeductibleTypesAndRecommendations } from "./generation_service";
import toJson from "enzyme-to-json";
import { render, unmountComponentAtNode } from "react-dom";
import { ServiceAPI, StatusCodes } from "../../../../api/";
import nock from "nock";

let container = null;

const build = () => render(<ConceptoDeduciblesComponent />, container);

const recommendationsSuccessResponse =  generateDeductibleTypesAndRecommendations(4);

const createRecommendationsInterceptor = () => {
    nock(new ServiceAPI().getBaseURL())
    .persist(true)
    .get("/recommendations")
    .reply(StatusCodes.OK, recommendationsSuccessResponse)
}

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
  
afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    return container;
});

it("Renders original content", () => {
    const tree = shallow(<ConceptoDeduciblesComponent />);
    expect(toJson(tree)).toMatchSnapshot();
});

