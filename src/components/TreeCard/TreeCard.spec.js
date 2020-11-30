import React from "react";
import { shallow } from "enzyme";
import TreeCard from "./TreeCard";

describe("TreeCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TreeCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
