import { prepareAfterEach, prepareBeforeEach } from './testing_utils';
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App from "../App";
import { render, unmountComponentAtNode } from 'react-dom';
import { getByTestId, waitFor } from '@testing-library/react';
import localForage from 'localforage';

it("Renders original content", ()=> {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
});

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

it("renders user login when user is not logged in", async () => {
    render(<App />, container);
    await waitFor( () => { expect(getByTestId(container, "login_screen")).toBeInTheDocument() } );
});

it("renders user HomePage when user is logged in",async()=> {
  const CURRENT_LOGGED_USER = "user";
  await localForage.setItem(CURRENT_LOGGED_USER, {notEmtpyObject:{}});
  render(<App />, container);
  await waitFor( () => expect(getByTestId(container, "home_page")).toBeInTheDocument() );
});