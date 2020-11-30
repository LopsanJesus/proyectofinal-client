import React from 'react';
import { shallow } from 'enzyme';
import BranchCard from './BranchCard';

describe('BranchCard', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<BranchCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
