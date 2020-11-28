import React from 'react';
import { shallow } from 'enzyme';
import TreeList from './TreeList';

describe('TreeList', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<TreeList />);
    expect(wrapper).toMatchSnapshot();
  });
});
