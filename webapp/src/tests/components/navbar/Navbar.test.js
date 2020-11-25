import '../../testing_utils';
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Navbar from "../../../components/navbar/Navbar";

it("Renders original content", ()=> {
    const tree = shallow(<Navbar />);
    expect(toJson(tree)).toMatchSnapshot();
});