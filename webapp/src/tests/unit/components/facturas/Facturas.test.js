import "../../testing_utils";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Facturas from "../../../../components/facturas/Facturas";
import { getByTestId, waitFor } from "@testing-library/react";
import { unmountComponentAtNode, render } from "react-dom";
import { ServiceAPI, StatusCodes } from "../../../../api/";
import nock from "nock";
import faker from "faker";

let container = null;

const build = () => render(<Facturas />, container);

const generateRecommendations = (quantity) => {
    let recommendations = []
    for( let i = 0; i < quantity; i++) {
        recommendations.push({
            description: faker.lorem.words(4),
        })
    }
    return recommendations;
}
const generateDeductibleTypesAndRecommendations = (quantity) => {
    let deductionTypes= [];
    for( let i = 0; i < quantity; i++){
        deductionTypes.push({
            key: faker.random.uuid,
            tipo_deduccion: faker.lorem.words(2),
            recomendaciones: generateRecommendations(Math.floor(Math.random * 5) + 1 ),
        })
    }
    return deductionTypes;
};
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
        expect( getByTestId(container, "lista_tipo_deducibles") ).toBeInTheDocument();
        expect( getByTestId(container, "panel_faq_enlaces") ).toBeInTheDocument();
    });
});