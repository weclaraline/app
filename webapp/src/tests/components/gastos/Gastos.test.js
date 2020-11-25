import '../../testing_utils';
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Gastos from "../../../components/gastos/Gastos";

it("Renders original content", ()=> {
    const tree = shallow(<Gastos />);
    expect(toJson(tree)).toMatchSnapshot();
});