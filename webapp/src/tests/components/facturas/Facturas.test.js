import '../../testing_utils';
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Facturas from "../../../components/facturas/Facturas";

it("Renders original content", ()=> {
    const tree = shallow(<Facturas />);
    expect(toJson(tree)).toMatchSnapshot();
});