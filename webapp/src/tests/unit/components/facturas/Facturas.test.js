import "../../testing_utils";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Facturas from "../../../../components/facturas/Facturas";
import { getByTestId, waitFor } from "@testing-library/react";
import { unmountComponentAtNode, render } from "react-dom";
import { generateDeductibleTypesAndRecommendations, generateFAQS, generateEnlaces } from "./generation_service";
import { ServiceAPI, StatusCodes } from "../../../../api/";
import { setCurrentLoggedUserInfo } from "../../../../utils/LogIn"
import nock from "nock";

let container = null;

const build = () => render(<Facturas />, container);

const recommendationsSuccessResponse =  generateDeductibleTypesAndRecommendations(4);
const faqsSuccessResponse =  generateFAQS()
const enlacesSuccessResponse =  generateEnlaces()
const fakeUserData = {
    email: "andres.campos@wizeline.com",
    familyName: "Campos Hernández",
    givenName: "Andrés",
    googleId: "115611530394300494470",
    imageUrl: "https://lh3.googleusercontent.com/a-/AOh14GjxBpTZByYN3HY0p9ytxKIcN55tCV_cZ4DivDY=s96-c",
    name: "Andrés Campos Hernández",
};

const createRecommendationsInterceptor = () => {
    nock(new ServiceAPI().getBaseURL())
    .persist(true)
    .get("/recommendations")
    .reply(StatusCodes.OK, recommendationsSuccessResponse)
    .get("/links")
    .reply(StatusCodes.OK, enlacesSuccessResponse)
    .get("/faq")
    .reply(StatusCodes.OK, faqsSuccessResponse);
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
    
    await setCurrentLoggedUserInfo( fakeUserData );

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