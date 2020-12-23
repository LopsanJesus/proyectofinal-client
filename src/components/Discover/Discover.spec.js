import React from "react";
import { shallow } from "enzyme";
import Discover from "./Discover";

describe("Discover", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Discover />);
    expect(wrapper).toMatchSnapshot();
  });
});
