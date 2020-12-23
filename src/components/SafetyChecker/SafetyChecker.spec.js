import React from 'react';
import { shallow } from 'enzyme';
import SafetyChecker from './SafetyChecker';

describe('SafetyChecker', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<SafetyChecker />);
    expect(wrapper).toMatchSnapshot();
  });
});
