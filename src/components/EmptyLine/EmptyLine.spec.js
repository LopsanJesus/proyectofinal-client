import React from "react";
import { shallow } from "enzyme";
import EmptyLine from "./EmptyLine";

describe("EmptyLine", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<EmptyLine />);
    expect(wrapper).toMatchSnapshot();
  });
});
