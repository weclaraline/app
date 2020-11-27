import "../../testing_utils";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import FAQEnlacesComponent from "../../../../components/facturas/FAQEnlacesComponent";

it("Renders original content", () => {
    const tree = shallow(<FAQEnlacesComponent/>);
    expect(toJson(tree)).toMatchSnapshot();
});