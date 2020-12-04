import "../../../testing_utils";
import { shallow } from "enzyme";
import ConceptoDeduciblesListComponent from "../../../../../components/facturas/ConceptosDeducibles/ConceptosDeduciblesListComponent";
import { generateDeductibleTypesAndRecommendations } from "../generation_service";
import toJson from "enzyme-to-json";
import { render, unmountComponentAtNode } from "react-dom";
import { getByTestId, waitFor } from "@testing-library/react";

let container = null;

const build = (props) => render(<ConceptoDeduciblesListComponent conceptosDeducibles={props}/>, container);

const conceptoDeducibleProps =  generateDeductibleTypesAndRecommendations(4);

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
    const tree = shallow(<ConceptoDeduciblesListComponent conceptosDeducibles={[]}/>);
    expect(toJson(tree)).toMatchSnapshot();
});

it("Renders elements passed by props", async () => {
    // const tree = shallow(<ConceptoDeduciblesListComponent conceptosDeducibles={conceptoDeducibleProps}/>);
    build(conceptoDeducibleProps);
    await waitFor(()=> {
        conceptoDeducibleProps.forEach( ({key}) => {
            expect(getByTestId(container, `concepto_deducible_${key}`)).toBeInTheDocument();
        });
    });
});