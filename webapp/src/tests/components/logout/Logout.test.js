import '../../testing_utils';
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Logout from "../../../components/logout/Logout";

it("Renders original content", ()=> {
    const tree = shallow(<Logout />);
    expect(toJson(tree)).toMatchSnapshot();
});