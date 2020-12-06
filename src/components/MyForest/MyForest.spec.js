import React from 'react';
import { shallow } from 'enzyme';
import MyForest from './MyForest';

describe('MyForest', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<MyForest />);
    expect(wrapper).toMatchSnapshot();
  });
});
