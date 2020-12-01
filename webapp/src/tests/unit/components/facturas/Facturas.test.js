import "../../testing_utils";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Facturas from "../../../../components/facturas/Facturas";
import { getByTestId, waitFor } from "@testing-library/react";
import { unmountComponentAtNode, render } from "react-dom";
import { generateDeductibleTypesAndRecommendations, generateFAQS, generateEnlaces } from "./generation_service";
import { ServiceAPI, StatusCodes } from "../../../../api/";
import nock from "nock";
import localForage from "localforage";

let container = null;

const build = () => render(<Facturas />, container);
const recommendationsSuccessResponse =  generateDeductibleTypesAndRecommendations(4);
const faqsSuccessResponse =  generateFAQS()
const enlacesSuccessResponse =  generateEnlaces()
const usersSuccessResponse = {};

const fakeUserData = {
    email: "name.surname@wizeline.com",
    familyName: "Sur Name",
    givenName: "Name",
    googleId: "114578530345190412000",
    imageUrl: "https://lh3.googleusercontent.com/a-/AOdd4GjdBpTdBydN3dY0p9ytxKIcN55tCV_cZ4DivDY=s96-b",
    name: "Name Sur Name",
};

const createRecommendationsInterceptor = () => {
    nock(new ServiceAPI().getBaseURL())
    .persist(true)
    .get("/recommendations")
    .reply(StatusCodes.OK, recommendationsSuccessResponse)
    .get("/links")
    .reply(StatusCodes.OK, enlacesSuccessResponse)
    .get("/faq")
    .reply(StatusCodes.OK, faqsSuccessResponse)
    .get("/users")
    .reply(StatusCodes.OK, usersSuccessResponse);
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

it("Calls recommendations", async () => {

    const CURRENT_LOGGED_USER = "user";
    await localForage.setItem(CURRENT_LOGGED_USER, fakeUserData);

    createRecommendationsInterceptor();
    build();
    await waitFor(() => {
        expect( getByTestId(container, "title_banner") ).toBeInTheDocument();
        expect( getByTestId(container, "lista_tipo_deducibles") ).toBeInTheDocument();

        expect( getByTestId(container, "panel_faq_enlaces") ).toBeInTheDocument();
        expect( getByTestId(container, "links-list") ).toBeInTheDocument();
        expect( getByTestId(container, "faqs-list") ).toBeInTheDocument();
    });
});