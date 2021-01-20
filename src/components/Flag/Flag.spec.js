import React from 'react';
import { shallow } from 'enzyme';
import Flag from './Flag';

describe('Flag', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Flag />);
    expect(wrapper).toMatchSnapshot();
  });
});
