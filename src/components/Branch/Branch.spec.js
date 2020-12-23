import React from "react";
import { shallow } from "enzyme";
import Branch from "./Branch";

describe("Branch", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Branch />);
    expect(wrapper).toMatchSnapshot();
  });
});
