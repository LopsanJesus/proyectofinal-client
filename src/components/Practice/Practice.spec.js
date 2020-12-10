import React from 'react';
import { shallow } from 'enzyme';
import Practice from './Practice';

describe('Practice', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Practice />);
    expect(wrapper).toMatchSnapshot();
  });
});
