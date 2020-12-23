import React from "react";
import { shallow } from "enzyme";
import TreeLanguageFlags from "./TreeLanguageFlags";

describe("TreeLanguageFlags", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TreeLanguageFlags />);
    expect(wrapper).toMatchSnapshot();
  });
});
