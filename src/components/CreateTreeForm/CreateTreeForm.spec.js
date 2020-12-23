import React from "react";
import { shallow } from "enzyme";
import CreateTreeForm from "./CreateTreeForm";

describe("CreateTreeForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CreateTreeForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
