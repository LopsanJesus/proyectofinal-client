import React from "react";
import { shallow } from "enzyme";
import BranchList from "./BranchList";

describe("BranchList", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<BranchList />);
    expect(wrapper).toMatchSnapshot();
  });
});
