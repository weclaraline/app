import '../../testing_utils';
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Avatar from "../../../components/navbar/Avatar";

it("Renders original content", ()=> {
    const tree = shallow(<Avatar />);
    expect(toJson(tree)).toMatchSnapshot();
});