import React from "react";
import { shallow } from "enzyme";
import Tree from "./Tree";

describe("Tree", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Tree />);
    expect(wrapper).toMatchSnapshot();
  });
});
