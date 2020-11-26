import '../../testing_utils';
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Notifications from "../../../../components/navbar/Notifications";

it("Renders original content", ()=> {
    const tree = shallow( <Notifications />);
    expect(toJson(tree)).toMatchSnapshot();
});