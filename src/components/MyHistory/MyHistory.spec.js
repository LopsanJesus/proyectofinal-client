import React from "react";
import { shallow } from "enzyme";
import MyHistory from "./MyHistory";

describe("MyHistory", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MyHistory />);
    expect(wrapper).toMatchSnapshot();
  });
});
