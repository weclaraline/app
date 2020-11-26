import '../../testing_utils';
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Login from "../../../../components/login/Login";

it("Renders original content", ()=> {
    const tree = shallow(<Login />);
    expect(toJson(tree)).toMatchSnapshot();
});