import React from "react";
import { shallow } from "enzyme";
import CreateBranchButton from "./CreateBranchButton";

describe("CreateBranchButton", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CreateBranchButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
