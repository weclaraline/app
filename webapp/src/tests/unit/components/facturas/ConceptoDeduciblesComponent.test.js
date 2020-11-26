import "../../testing_utils";
import { mount, shallow } from "enzyme";
import ConceptoDeducibesComponent from "../../../../components/facturas/ConceptoDeduciblesComponent";
import toJson from "enzyme-to-json";
import { render, unmountComponentAtNode } from "react-dom";
import { getByTestId, waitFor } from "@testing-library/react";
import { generateDeductibleTypesAndRecommendations } from "./generation_service";

let container = null;

const passingPropsTipoDeducibles =  generateDeductibleTypesAndRecommendations(4);

const build = (props) => render(<ConceptoDeducibesComponent tipoDeducibles={props}/>, container);

it("Renders original content", () => {
    const tree = shallow(<ConceptoDeducibesComponent/>);
    expect(toJson(tree)).toMatchSnapshot();
});

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


// it("Shows nothing when there's no deductible types", async () => {
// //    const mounted = mount(<ConceptoDeducibesComponent tipoDeducibles={[]} />);
// //    expect(false).toBeFalsy();
// });