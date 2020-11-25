import './testing_utils';
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App from "../App";

it("Renders original content", ()=> {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
});