import { render, unmountComponentAtNode } from "react-dom";
import { getByTestId, waitFor } from "@testing-library/react";
import localForage from "localforage";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import "./testing_utils";
import App from "../../App";

const build = () => {render(<App />, container);}

let container = null;

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

it("Renders original content", ()=> {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
});

it("renders user login when user is not logged in", async () => {
    build();
    await waitFor( () => { 
        expect(getByTestId(container, "login_screen")).toBeInTheDocument() 
    });
});

it("renders user HomePage when user is logged in",async()=> {
    const CURRENT_LOGGED_USER = "user";
    await localForage.setItem(CURRENT_LOGGED_USER, {notEmtpyObject:{}});
    build();
    await waitFor(() => {
        expect(getByTestId(container, "home_page")).toBeInTheDocument() 
    });
});