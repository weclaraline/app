import "../../testing_utils";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Facturas from "../../../../components/facturas/Facturas";
import { getByTestId, waitFor } from "@testing-library/react";
import { unmountComponentAtNode, render } from "react-dom";
import { generateDeductibleTypesAndRecommendations } from "./generation_service";
import { ServiceAPI, StatusCodes } from "../../../../api/";
import nock from "nock";

let container = null;

const build = () => render(<Facturas />, container);
const recommendationsSuccessResponse =  generateDeductibleTypesAndRecommendations(4)
const createRecommendationsInterceptor = () => {
    nock(new ServiceAPI().getBaseURL())
    .get("/recomendaciones")
    .reply(StatusCodes.OK, recommendationsSuccessResponse);
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

it("Renders original content", ()=> {
    const tree = shallow(<Facturas />);
    expect(toJson(tree)).toMatchSnapshot();
});

it("Calls recommendation service and loads recommendations", async () => {
    createRecommendationsInterceptor();
    build();
    await waitFor(() => {
        expect( getByTestId(container, "title_banner") ).toBeInTheDocument();
        expect( getByTestId(container, "lista_tipo_deducibles") ).toBeInTheDocument();
        expect( getByTestId(container, "panel_faq_enlaces") ).toBeInTheDocument();
    });
});