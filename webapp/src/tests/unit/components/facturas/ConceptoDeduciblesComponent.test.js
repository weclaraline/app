import "../../testing_utils";
import { shallow } from "enzyme";
import ConceptoDeduciblesComponent from "../../../../components/facturas/ConceptoDeduciblesComponent";
import toJson from "enzyme-to-json";
import { render, unmountComponentAtNode } from "react-dom";
import { getByTestId, queryAllByTestId, queryByTestId, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ServiceAPI, StatusCodes } from "../../../../api/";
import nock from "nock";

let container = null;

const build = () => render(<ConceptoDeduciblesComponent />, container);

beforeEach(() => {
    nock.cleanAll();
    container = document.createElement("div");
    document.body.appendChild(container);
});
  
afterEach(() => {
    nock.cleanAll();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    return container;
});

it("Renders original content", () => {
    const tree = shallow(<ConceptoDeduciblesComponent />);
    expect(toJson(tree)).toMatchSnapshot();
});
